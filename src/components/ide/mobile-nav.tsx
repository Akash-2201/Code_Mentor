"use client";

import { Menu, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sidebar } from "@/components/ide/sidebar";
import { cn } from "@/lib/utils";

type MobileNavProps = {
  open: boolean;
  onToggle: () => void;
  activeId: string;
  onNavigate: (id: string) => void;
};

export function MobileNav({ open, onToggle, activeId, onNavigate }: MobileNavProps) {
  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={onToggle}
        aria-label={open ? "Close menu" : "Open menu"}
      >
        {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
      </Button>

      {open && (
        <>
          <button
            type="button"
            className="fixed inset-0 z-40 bg-black/60 backdrop-blur-sm lg:hidden"
            onClick={onToggle}
            aria-label="Close overlay"
          />
          <div
            className={cn(
              "fixed inset-y-0 left-0 z-50 lg:hidden",
              "animate-in slide-in-from-left duration-200"
            )}
          >
            <Sidebar
              activeId={activeId}
              onNavigate={(id) => {
                onNavigate(id);
                onToggle();
              }}
            />
          </div>
        </>
      )}
    </>
  );
}
