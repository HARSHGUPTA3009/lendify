// SPDX-License-Identifier: MIT
pragma solidity ^0.8.20;

contract LoanManager {
    enum LoanStatus { Created, Funded, Repaid }

    struct Loan {
        uint256 id;
        address borrower;
        address lender;
        uint256 amount;
        uint256 collateralId;
        uint256 repaid;
        uint256 dueDate;
        LoanStatus status;
    }

    uint256 public nextLoanId;
    mapping(uint256 => Loan) public loans;
    mapping(address => uint256[]) public loansByBorrower;

    event LoanCreated(uint256 loanId, address borrower, uint256 amount, uint256 collateralId, uint256 dueDate);
    event LoanFunded(uint256 loanId, address lender);
    event LoanRepaid(uint256 loanId, uint256 amount);

    function createLoan(uint256 amount, uint256 collateralId, uint256 durationDays) external {
        loans[nextLoanId] = Loan({
            id: nextLoanId,
            borrower: msg.sender,
            lender: address(0),
            amount: amount,
            collateralId: collateralId,
            repaid: 0,
            dueDate: block.timestamp + (durationDays * 1 days),
            status: LoanStatus.Created
        });
        loansByBorrower[msg.sender].push(nextLoanId);

        emit LoanCreated(nextLoanId, msg.sender, amount, collateralId, loans[nextLoanId].dueDate);
        nextLoanId++;
    }

    function fundLoan(uint256 loanId) external payable {
        Loan storage loan = loans[loanId];
        require(loan.status == LoanStatus.Created, "Loan not available to fund");
        require(msg.value == loan.amount, "Incorrect amount");

        loan.lender = msg.sender;
        loan.status = LoanStatus.Funded;

        payable(loan.borrower).transfer(msg.value);

        emit LoanFunded(loanId, msg.sender);
    }

    function repayLoan(uint256 loanId) external payable {
        Loan storage loan = loans[loanId];
        require(msg.sender == loan.borrower, "Only borrower can repay");
        require(loan.status == LoanStatus.Funded, "Loan must be funded");
        require(msg.value == loan.amount, "Incorrect repayment amount");

        loan.repaid += msg.value;
        loan.status = LoanStatus.Repaid;

        payable(loan.lender).transfer(msg.value);

        emit LoanRepaid(loanId, msg.value);
    }
function getLoansByBorrower(address borrower)
    external
    view
    returns (
        uint256[] memory ids,
        uint256[] memory amounts,
        uint256[] memory repaidAmounts,
        address[] memory lenders,
        uint256[] memory dueDates,
        uint8[] memory statuses
    )
{
    uint256[] memory loanIds = loansByBorrower[borrower];

    ids = new uint256[](loanIds.length);
    amounts = new uint256[](loanIds.length);
    repaidAmounts = new uint256[](loanIds.length);
    lenders = new address[](loanIds.length);
    dueDates = new uint256[](loanIds.length);
    statuses = new uint8[](loanIds.length);

    for (uint256 i = 0; i < loanIds.length; i++) {
        Loan storage loan = loans[loanIds[i]];
        ids[i] = loan.id;
        amounts[i] = loan.amount;
        repaidAmounts[i] = loan.repaid;
        lenders[i] = loan.lender;
        dueDates[i] = loan.dueDate;
        statuses[i] = uint8(loan.status); // explicit cast to uint8 here
    }
}




    function getLoan(uint256 loanId) external view returns (Loan memory) {
        return loans[loanId];
    }
}
