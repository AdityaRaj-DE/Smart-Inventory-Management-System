"use client";

export default function AuditDetail({ log }: any) {

  if (!log) return null;

  return (
    <div className="bg-white p-5 rounded shadow">

      <h2 className="text-lg font-semibold mb-4">
        Audit Log Detail
      </h2>

      <p><b>User:</b> {log.user?.name}</p>
      <p><b>Action:</b> {log.action}</p>
      <p><b>Entity:</b> {log.entity}</p>
      <p><b>Entity ID:</b> {log.entityId}</p>

      <p className="mt-3">
        <b>Metadata:</b>
      </p>

      <pre className="bg-gray-100 p-3 rounded text-sm overflow-auto">
        {JSON.stringify(log.metadata, null, 2)}
      </pre>

    </div>
  );
}