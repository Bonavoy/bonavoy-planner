import { useState, useEffect, ReactNode } from 'react';
import { createPortal } from 'react-dom';

interface ModalProps {
  children: ReactNode;
  show: boolean;
}

export default function Modal({ children, show }: ModalProps) {
  //it'll render in server first
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    return () => setIsClient(false);
  }, []);

  if (!show || !isClient) return null;

  return createPortal(
    <main className="fixed bottom-0 left-0 right-0 top-0 z-50 flex items-center justify-center bg-black/70 p-10">
      <dialog className="contents">
        <div className="relative">{children}</div>
      </dialog>
    </main>,
    document.querySelector('#modal-root') as HTMLElement,
  );
}
