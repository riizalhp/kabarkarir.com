
export const toast = (message: string) => {
  const containerId = 'toast-container';
  let container = document.getElementById(containerId);

  if (!container) {
    container = document.createElement('div');
    container.id = containerId;
    container.className = 'fixed bottom-4 right-4 z-50 flex flex-col items-end gap-2';
    document.body.appendChild(container);
  }

  const toastElement = document.createElement('div');
  toastElement.className = 'bg-secondary text-white px-4 py-2 rounded-lg shadow-lg animate-fade-in-up';
  toastElement.innerText = message;
  
  // Add animation styles
  const style = document.createElement('style');
  style.innerHTML = `
    @keyframes fade-in-up {
      0% {
        opacity: 0;
        transform: translateY(20px);
      }
      100% {
        opacity: 1;
        transform: translateY(0);
      }
    }
    .animate-fade-in-up {
      animation: fade-in-up 0.3s ease-out forwards;
    }
  `;
  document.head.appendChild(style);


  container.appendChild(toastElement);

  setTimeout(() => {
    toastElement.remove();
    if (container && !container.hasChildNodes()) {
      container.remove();
    }
    style.remove();
  }, 3000);
};
