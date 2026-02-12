type NoticeType = "success" | "error";

const ROOT_ID = "ui-toast-root";

function getRoot(): HTMLDivElement {
  let root = document.getElementById(ROOT_ID) as HTMLDivElement | null;
  if (!root) {
    root = document.createElement("div");
    root.id = ROOT_ID;
    root.className = "ui-toast-root";
    document.body.appendChild(root);
  }
  return root;
}

export function showNotice(message: string, type: NoticeType = "success") {
  if (typeof window === "undefined") {
    return;
  }

  const root = getRoot();
  const toast = document.createElement("div");
  toast.className = `ui-toast ui-toast-${type}`;
  toast.role = "status";
  toast.textContent = message;
  root.appendChild(toast);

  window.setTimeout(() => {
    toast.classList.add("ui-toast-exit");
    window.setTimeout(() => {
      toast.remove();
      if (!root.childElementCount) {
        root.remove();
      }
    }, 220);
  }, 2400);
}
