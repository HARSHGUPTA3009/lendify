export function useToast() {
  return {
    toast: ({ title, description, variant }) => {
      alert(`${title}\n${description}`);
      console.log("Toast:", { title, description, variant });
    },
  };
}
