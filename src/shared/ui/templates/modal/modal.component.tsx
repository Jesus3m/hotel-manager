"use client";
import React, { useEffect, useState } from "react";
import { createPortal } from "react-dom";
import { nanoid } from "nanoid";
import { AnimatePresence, motion } from "framer-motion";
export interface Modal {
  isOpen: boolean;
  children: React.ReactNode;
  onClose: () => void;
  title?: string;
  actions?: {
    label: string;
    onClick: () => void;
    className: string;
  }[];
}

export const Modal = ({ children, isOpen, onClose, actions, title }: Modal) => {
  const [state, setState] = useState(false);

  useEffect(() => {
    setState(true);
  }, []);
  return state ? (
    createPortal(
      isOpen && (
        <AnimatePresence mode="popLayout">
          <motion.section
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-10 "
          ></motion.section>
          <motion.div
            layout
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring" }}
            className="absolute w-3/4 left-0 right-0 bottom-0 top-0 m-auto h-max max-h-[90vh] bg-white rounded-lg p-4 z-20 overflow-hidden text-gray-700"
          >
            {title && (
              <div>
                <h1 className="text-2xl font-bold">{title}</h1>
              </div>
            )}
            <div
              className="w-full mb-5 h-max max-h-[80vh] 
          overflow-y-scroll"
            >
              {children}
            </div>
            {actions?.length && (
              <div className="p-2 flex justify-end absolute bottom-0 right-0 w-full bg-white">
                {actions.map((action) => (
                  <button
                    key={nanoid()}
                    className={`p-2 rounded ${action.className}`}
                  >
                    <span>{action.label}</span>
                  </button>
                ))}
              </div>
            )}
          </motion.div>
        </AnimatePresence>
      ),
      document.body
    )
  ) : (
    <></>
  );
};
