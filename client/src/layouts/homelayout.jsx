import { Outlet, useLocation, Link } from "react-router-dom";
import { useState } from "react";
import {
  Dialog,
  DialogBackdrop,
  DialogPanel,
  Menu,
  MenuButton,
  TransitionChild,
} from "@headlessui/react";
import {
  Bars3Icon,
  HomeIcon,
  UsersIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import dashboardIcon from "../assets/icons/dashboardIcon.svg";
import usersIcon from "../assets/icons/usersIcon.svg";
import JohnPetersonIcon from "../assets/icons/johnPetersonIcon.svg";
import ShortDownArrowIcon from "../assets/icons/shortDownArrowIcon.svg";
import bellNotificationsIcon from "../assets/icons/bellNoticationsIcon.svg";
import smsIcon from "../assets/icons/smsIcon.svg";

const navigation = [
  {
    name: "Dashboard",
    href: "/home",
    icon: HomeIcon,
    src: dashboardIcon,
    arrow: ShortDownArrowIcon,
  },
  {
    name: "Users",
    href: "/users",
    icon: UsersIcon,
    src: usersIcon,
    arrow: "",
  },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HomeLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  return (
    <>
      <div>
        <Dialog
          open={sidebarOpen}
          onClose={setSidebarOpen}
          className="relative z-50 lg:hidden"
        >
          <DialogBackdrop
            transition
            className="fixed inset-0 bg-gray-900/80 transition-opacity duration-300 ease-linear data-[closed]:opacity-0"
          />

          <div className="fixed inset-0 flex">
            <DialogPanel
              transition
              className="relative mr-16 flex w-full max-w-xs flex-1 transform transition duration-300 ease-in-out data-[closed]:-translate-x-full"
            >
              <TransitionChild>
                <div className="absolute left-full top-0 flex w-16 justify-center pt-5 duration-300 ease-in-out data-[closed]:opacity-0">
                  <button
                    type="button"
                    onClick={() => setSidebarOpen(false)}
                    className="-m-2.5 p-2.5"
                  >
                    <span className="sr-only">Close sidebar</span>
                    <XMarkIcon
                      aria-hidden="true"
                      className="h-6 w-6 text-white"
                    />
                  </button>
                </div>
              </TransitionChild>

              {/* SIDEBAR COMPONENT FOR MOBILE */}
              <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#403294] px-6 pb-4">
                <div className="flex items-center gap-3 mt-8 mb-4">
                  <img src={JohnPetersonIcon} alt="john peterson icon" />
                  <div className="flex flex-col">
                    <p className="text-[#DEEBFF] font-semibold text-[14px]">
                      John Peterson
                    </p>
                    <p className="text-[#B3D4FF] text-[12px] mt-[-3px]">
                      Admin
                    </p>
                  </div>
                </div>

                <nav className="flex flex-1 flex-col">
                  <ul role="list" className="flex flex-1 flex-col gap-y-7">
                    <li>
                      <ul role="list" className="-mx-2 space-y-[5px]">
                        {navigation.map((item) => (
                          <li key={item.name}>
                            <Link
                              to={item.href}
                              className={classNames(
                                location.pathname === item.href
                                  ? "bg-[#6554C0] text-[#EAE6FF]"
                                  : "text-white hover:bg-[#6554C0] hover:text-[#EAE6FF]",
                                "group flex gap-x-3 rounded-md py-2 px-4 text-[13px] font-semibold leading-6 justify-between"
                              )}
                            >
                              <div className="flex gap-2">
                                <img
                                  aria-hidden="true"
                                  className={classNames(
                                    location.pathname === item.href
                                      ? "text-white"
                                      : "text-indigo-200 group-hover:text-white",
                                    "h-6 w-6 shrink-0"
                                  )}
                                  src={item.src}
                                  alt={item.name}
                                />
                                {item.name}
                              </div>
                              {/* <img src={item.arrow} alt="" /> */}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    </li>
                  </ul>
                </nav>
              </div>
            </DialogPanel>
          </div>
        </Dialog>

        {/* STATIC SIDEBAR FOR DESKTOP */}
        <div className="hidden lg:fixed lg:inset-y-0 lg:z-40 lg:flex lg:w-[233px] lg:flex-col">
          <div className="flex grow flex-col gap-y-5 overflow-y-auto bg-[#403294] px-6 pb-4 lg:pt-11">
            <div className="flex items-center gap-3 mt-8 mb-4">
              <img src={JohnPetersonIcon} alt="john peterson icon" />
              <div className="flex flex-col">
                <p className="text-[#DEEBFF] font-semibold text-[14px]">
                  John Peterson
                </p>
                <p className="text-[#B3D4FF] text-[12px] mt-[-3px]">Admin</p>
              </div>
            </div>

            <nav className="flex flex-1 flex-col">
              <ul role="list" className="flex flex-1 flex-col gap-y-7">
                <li>
                  <ul role="list" className="-mx-2 space-y-[5px]">
                    {navigation.map((item) => (
                      <li key={item.name}>
                        <Link
                          to={item.href}
                          className={classNames(
                            location.pathname === item.href
                              ? "bg-[#6554C0] text-[#EAE6FF]"
                              : "text-white hover:bg-[#6554C0] hover:text-[#EAE6FF]",
                            "group flex gap-x-3 rounded-md py-2 px-4 text-[13px] font-semibold leading-6 justify-between"
                          )}
                        >
                          <div className="flex gap-2">
                            <img
                              aria-hidden="true"
                              className={classNames(
                                location.pathname === item.href
                                  ? "text-white"
                                  : "text-indigo-200 group-hover:text-white",
                                "h-6 w-6 shrink-0"
                              )}
                              src={item.src}
                              alt={item.name}
                            />
                            {item.name}
                          </div>
                          {/* <img src={item.arrow} alt="" /> */}
                        </Link>
                      </li>
                    ))}
                  </ul>
                </li>
              </ul>
            </nav>
          </div>
        </div>

        <div className="">
          {/* Sticky top header */}
          <div className="sticky top-0 z-40 flex h-[50px] shrink-0 items-center gap-x-4 border-b border-gray-200 bg-white px-4 shadow-sm sm:gap-x-6 sm:px-6 lg:pl-5 lg:pr-2">
            <button
              type="button"
              onClick={() => setSidebarOpen(true)}
              className="-m-2.5 p-2.5 text-gray-700 lg:hidden"
            >
              <span className="sr-only">Open sidebar</span>
              <Bars3Icon aria-hidden="true" className="h-6 w-6" />
            </button>

            {/* Separator */}
            <div
              aria-hidden="true"
              className="h-6 w-px bg-gray-900/10 hidden sm:block lg:hidden"
            />

            <div className="flex flex-1 gap-x-4 self-stretch lg:gap-x-6 justify-between items-center">
              <div className="flex items-center gap-2">
                <img src={smsIcon} alt="sms icon" className="hidden lg:block" />
                <h1 className="hidden sm:block text-[14px] font-semibold">
                  School Management System
                </h1>
              </div>

              <div className="flex items-center gap-x-4 lg:gap-x-6">
                <button
                  type="button"
                  className="-m-2.5 p-2.5 text-gray-400 hover:text-gray-500"
                >
                  <span className="sr-only">View notifications</span>
                  <img
                    aria-hidden="true"
                    src={bellNotificationsIcon}
                    alt="bell notifications"
                    width={20}
                    height={20}
                  />
                </button>

                {/* Profile dropdown */}
                <Menu as="div" className="relative">
                  <MenuButton className="-m-1.5 flex items-center p-1.5">
                    <span className="sr-only">Open user menu</span>
                  </MenuButton>
                </Menu>
              </div>
            </div>
          </div>

          <main className="pt-6 pb-10 lg:pl-[225px]">
            <div className="px-4 sm:px-6 lg:px-8">
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </>
  );
}