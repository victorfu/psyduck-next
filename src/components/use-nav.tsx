"use client";

import { usePathname } from "next/navigation";
import {
  PATHNAME_PROFILE,
  PATHNAME_USERS,
  PATHNAME_LOGOUT,
  PATHNAME_LOGIN,
  PATHNAME_BOT,
  PATHNAME_HOME,
} from "@/lib/constants";

const useNav = (user?: User) => {
  const pathname = usePathname();

  const mainNavigation = (pathname: string, user?: User) => {
    const isAdmin = user?.customClaims?.isAdmin;
    const pages = [
      { name: "Home", href: PATHNAME_HOME },
      ...(isAdmin ? [{ name: "Bot", href: PATHNAME_BOT }] : []),
      ...(isAdmin ? [{ name: "Users", href: PATHNAME_USERS }] : []),
    ];

    return pages.map((page) => ({
      ...page,
      current: pathname === page.href,
    }));
  };

  const userNavigation = (user?: User) => {
    return user
      ? [
          {
            name: "Profile",
            href: PATHNAME_PROFILE,
          },
          { name: "Logout", href: PATHNAME_LOGOUT },
        ]
      : [{ name: "Login", href: PATHNAME_LOGIN }];
  };
  return {
    mainNavigation: mainNavigation(pathname, user),
    userNavigation: userNavigation(user),
  };
};

export default useNav;
