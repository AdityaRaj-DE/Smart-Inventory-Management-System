export const downloadBackup = async () => {
  const res = await fetch("/api/admin/backup-db", {
    method: "GET",
    credentials: "include",
  });

  if (!res.ok) throw new Error("Backup failed");

  const blob = await res.blob();

  const url = window.URL.createObjectURL(blob);

  const a = document.createElement("a");
  a.href = url;
  a.download = "inventory-backup.zip";
  a.click();
};

export const restoreBackup = async (file: File) => {
  const formData = new FormData();
  formData.append("file", file);

  const res = await fetch("/api/admin/restore-db", {
    method: "POST",
    credentials: "include",
    body: formData,
  });

  if (!res.ok) throw new Error("Restore failed");

  return res.json();
};