import { ReactNode, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

const MODAL_SELECTOR = '#modal';

interface ModalProps {
  children: ReactNode;
}

const Modal = ({ children }: ModalProps) => {
  const ref = useRef<Element | null>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    ref.current = document.querySelector(MODAL_SELECTOR);
    setMounted(true);
  }, []);
  return mounted ? createPortal(children, ref.current as Element) : null;
};

export default Modal;
