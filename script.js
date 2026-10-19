
"use strict";

document.addEventListener("DOMContentLoaded", () => {
  const menuToggle = document.getElementById("menuToggle");
  const navLinks = document.getElementById("navLinks");
  const toast = document.getElementById("toast");

  const SERVER_IP = "watancraft2.aternos.me";
  const SERVER_PORT = "16079";

  let toastTimer;

  document.getElementById("year").textContent =
    String(new Date().getFullYear());

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");

    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => {
      toast.classList.remove("show");
    }, 2600);
  }

  async function copyText(text) {
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(text);
        return true;
      }

      const textarea = document.createElement("textarea");
      textarea.value = text;
      textarea.setAttribute("readonly", "");
      textarea.style.position = "fixed";
      textarea.style.opacity = "0";
      textarea.style.pointerEvents = "none";

      document.body.appendChild(textarea);
      textarea.select();
      textarea.setSelectionRange(0, textarea.value.length);

      const success = document.execCommand("copy");
      textarea.remove();

      if (!success) {
        throw new Error("Copy failed");
      }

      return true;
    } catch {
      showToast("کپی خودکار نشد؛ لطفاً متن را دستی کپی کن.");
      return false;
    }
  }

  async function copyValue(value, message) {
    const success = await copyText(value);

    if (success) {
      showToast(message);
    }
  }

  document.querySelectorAll("[data-copy]").forEach((button) => {
    button.addEventListener("click", () => {
      const id = button.getAttribute("data-copy");
      const target = document.getElementById(id);

      if (!target) return;

      copyValue(
        target.textContent.trim(),
        id === "serverIP"
          ? "آدرس سرور کپی شد! ✓"
          : "پورت سرور کپی شد! ✓"
      );
    });
  });

  async function copyConnectionDetails() {
    await copyValue(
      `${SERVER_IP}:${SERVER_PORT}`,
      "آدرس و پورت سرور کپی شدند! ✓"
    );
  }

  document.getElementById("copyAll").addEventListener(
    "click", copyConnectionDetails
  );

  document.getElementById("joinCopy").addEventListener(
    "click", copyConnectionDetails
  );

  document.getElementById("finalCopy").addEventListener(
    "click", copyConnectionDetails
  );

  menuToggle.addEventListener("click", () => {
    const isOpen = navLinks.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "بستن منو" : "باز کردن منو"
    );
    menuToggle.textContent = isOpen ? "✕" : "☰";
  });

  navLinks.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "باز کردن منو");
      menuToggle.textContent = "☰";
    });
  });
});
