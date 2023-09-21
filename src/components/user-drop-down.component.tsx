"use client";
import Image from "next/image";
import clsx from "clsx";
import { useState } from "react";
import { useClickAway } from "@uidotdev/usehooks";

export default function UserDropDown() {
  const [isDropDownOpened, setIsDropDownOpened] = useState(false);
  const dropDownClasses = clsx({
    hidden: !isDropDownOpened,
    "absolute top-6 -right-6": true,
  });
  const toggleDropdown = () => {
    setIsDropDownOpened(!isDropDownOpened);
  };
  const dropdownRef = useClickAway<HTMLDivElement>((e) => {
    const element = e.target as HTMLElement;
    if (element.closest("#user-menu-button")) {
      return;
    }
    setIsDropDownOpened(false);
  });

  return (
    <div className="flex items-center relative">
      <button
        type="button"
        className="flex mr-3 text-sm bg-gray-800 rounded-full md:mr-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded="false"
        data-dropdown-toggle="user-dropdown"
        data-dropdown-placement="bottom"
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        <Image
          width={32}
          height={32}
          className="w-8 h-8 rounded-full"
          src="/assets/avatar.jpeg"
          alt="user photo"
        />
      </button>
      <div
        className={`z-50 my-4 text-base list-none bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600 ${dropDownClasses}`}
        id="user-dropdown"
        ref={dropdownRef}
      >
        <div className="px-4 py-3">
          <span className="block text-sm text-gray-900 dark:text-white">
            Bonnie Green
          </span>
          <span className="block text-sm  text-gray-500 truncate dark:text-gray-400">
            name@flowbite.com
          </span>
        </div>
        <ul className="py-2" aria-labelledby="user-menu-button">
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Dashboard
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Settings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Earnings
            </a>
          </li>
          <li>
            <a
              href="#"
              className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
            >
              Sign out
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}
