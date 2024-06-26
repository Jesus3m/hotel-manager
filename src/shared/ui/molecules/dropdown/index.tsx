import { Fragment } from "react";
import {
  Menu,
  MenuButton,
  MenuItems,
  MenuItem,
  Transition,
} from "@headlessui/react";
import { nanoid } from "nanoid";
function classNames(...classes: any) {
  return classes.filter(Boolean).join(" ");
}

export default function Dropdown({
  children,
  options,
  position,
}: {
  children: any;
  options: any[];
  position: string;
}) {
  return (
    <Menu as="div" className="relative inline-block text-left">
      <div>
        <MenuButton as={Fragment}>{children}</MenuButton>
      </div>

      <Transition
        as={Fragment}
        enter="transition ease-out duration-100"
        enterFrom="transform opacity-0 scale-95"
        enterTo="transform opacity-100 scale-100"
        leave="transition ease-in duration-75"
        leaveFrom="transform opacity-100 scale-100"
        leaveTo="transform opacity-0 scale-95"
      >
        <MenuItems
          anchor={{
            to: position as any,
          }}
          className="absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
        >
          <div className="py-1">
            {options.map((option) => (
              <MenuItem key={nanoid()}>
                {({ active }) => (
                  <a
                    onClick={option.onClick}
                    className={classNames(
                      active ? "bg-gray-100 text-gray-900" : "text-gray-700",
                      "block px-4 py-2 text-sm"
                    )}
                  >
                    {option.label}
                  </a>
                )}
              </MenuItem>
            ))}
          </div>
        </MenuItems>
      </Transition>
    </Menu>
  );
}
