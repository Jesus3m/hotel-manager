import {
  Popover,
  PopoverButton,
  PopoverPanel,
  Transition,
} from "@headlessui/react";

export const Popup = ({
  children,
  trigger,
}: {
  children: React.ReactNode;
  trigger: React.ReactNode;
}) => {
  return (
    <Popover>
      <PopoverButton className="">{trigger}</PopoverButton>
      <Transition
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <PopoverPanel
          anchor="bottom"
          className="divide-y divide-black rounded-xl bg-white text-sm/6 [--anchor-gap:var(--spacing-5)] z-50 border-gray-400 shadow-lg mt-4"
        >
          {children}
        </PopoverPanel>
      </Transition>
    </Popover>
  );
};
