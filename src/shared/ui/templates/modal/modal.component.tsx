"use client";
import React from "react";
import { createPortal } from "react-dom";
import { nanoid } from "nanoid";
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
  return createPortal(
    isOpen && (
      <>
        <section
          onClick={onClose}
          className="fixed top-0 left-0 right-0 bottom-0 w-full h-full bg-black bg-opacity-40 flex justify-center items-center z-10 "
        ></section>
        <div className="absolute w-3/4 left-0 right-0 bottom-0 top-0 m-auto h-max max-h-[90vh] bg-white rounded-lg p-4 z-20 overflow-hidden">
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
        </div>
      </>
    ),
    document.body
  );
};
