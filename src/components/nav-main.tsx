"use client";

import NAV_CONTENT from "@/contents/navbar";
import { cn } from "@/lib/utils";
import { useLanguage } from "@/providers/lang-provider";
import { ClassValue } from "clsx";
import NextLink from "next/link";
import { usePathname } from "next/navigation";
import React, { useState } from "react";
import { Toggle } from "./ui/toggle";
import { signOut, useSession } from "next-auth/react";
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar";
import { User } from "lucide-react";
import { Button, buttonVariants } from "./ui/button";
import Link from "next/link";
import { UserAvatar } from "./user-avatar";

type NavLinkProps = {
  href: string;
  disabled?: boolean;
  mobile?: boolean;
} & React.HTMLAttributes<HTMLElement>;

type NavBarProps = {} & React.HTMLAttributes<HTMLElement>;

export function NavLink({
  href,
  children,
  disabled = false,
  className,
  mobile = false,
}: NavLinkProps) {
  const path = usePathname();

  function NavButton() {
    const style: ClassValue = mobile
      ? cn(
          "flex items-center rounded-md px-3 py-2 text-sm md:text-base font-medium transition-colors hover:bg-accent/80 hover:text-foreground/80",
          path === href
            ? "bg-accent text-foreground"
            : "bg-transparent text-foreground/60"
        )
      : cn(
          "flex items-center rounded-md px-3 py-2 text-sm md:text-base  font-medium transition-colors hover:text-foreground/80",
          path === href ? "text-foreground" : "text-foreground/60"
        );

    return (
      <span
        className={cn(
          style,
          disabled && "cursor-not-allowed opacity-80",
          className
        )}
      >
        <span>{children}</span>
      </span>
    );
  }

  return (
    <>
      {disabled ? (
        <NavButton />
      ) : (
        <NextLink href={href}>
          <NavButton />
        </NextLink>
      )}
    </>
  );
}

export function Navbar({ className, children, ...props }: NavBarProps) {
  return (
    <nav
      className={cn(
        "flex items-center space-6 md:space-8 w-full px-2 py-4 bg-inherit",
        className
      )}
      {...props}
    >
      {children}
    </nav>
  );
}

export function NavMain() {
  const { lang, setLang } = useLanguage();
  const { data: session, status } = useSession();

  return (
    <Navbar className="px-4 py-2 h-16 items-center  border-b sticky z-50 top-0">
      <NavLink href="/">
        <h4 className="scroll-m-20 text-lg font-semibold tracking-tight">
          MadLoved
        </h4>
      </NavLink>
      {NAV_CONTENT[lang].map((item) => (
        <NavLink key={item.href} href={item.href}>
          {item.label}
        </NavLink>
      ))}
      <div className="flex grow justify-end gap-2">
        {status === "authenticated" ? (
          <div>
            <UserAvatar
              image={session.user?.image}
              name={session.user?.email}
            />
          </div>
        ) : (
          <div>
            <Link
              href={"/login"}
              className={cn(buttonVariants({ variant: "outline" }))}
            >
              Sign In
            </Link>
          </div>
        )}
      </div>
    </Navbar>
  );
}
