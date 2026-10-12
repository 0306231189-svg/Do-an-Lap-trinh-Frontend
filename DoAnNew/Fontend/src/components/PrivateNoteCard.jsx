import { NavLink } from "react-router-dom"
export default function PrivateNoteCard({ note, handleDeleteNote }) {
    return (
        <div
            key={note.id}
            className="group flex flex-col justify-between p-5 bg-white dark:bg-slate-900 border border-amber-500/30 rounded-2xl shadow-sm hover:border-amber-500 transition duration-200"
        >
            <div>
                <div className="flex items-center justify-between mb-3">
                    <span className="px-2.5 py-1 text-xs font-semibold rounded-md bg-amber-500/10 text-amber-600 dark:text-amber-400 border border-amber-500/20 flex items-center gap-1">
                        🔒 Riêng tư
                    </span>

                    {/* Nút Sửa (NavLink) & Xóa */}
                    <div className="flex items-center gap-1">
                        <NavLink
                            to={`/notes/edit/${note.id}/${note.topic}`}
                            title="Chỉnh sửa"
                            className="p-1.5 text-slate-400 hover:text-amber-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                        </NavLink>
                        <button
                            onClick={() => handleDeleteNote(note.id, note.topic)}
                            title="Xóa"
                            className="p-1.5 text-slate-400 hover:text-rose-500 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition"
                        >
                            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                        </button>
                    </div>
                </div>

                <h3 className="text-base font-bold text-slate-900 dark:text-white mb-2 line-clamp-1">
                    {note.title}
                </h3>

                <p className="text-sm font-mono text-slate-700 dark:text-slate-300 bg-slate-50 dark:bg-slate-800/50 p-3 rounded-xl whitespace-pre-line line-clamp-5 mb-4 border border-slate-200 dark:border-slate-800">
                    {note.content}
                </p>
            </div>

            <div className="pt-3 border-t border-slate-100 dark:border-slate-800/60 text-[11px] text-slate-400 dark:text-slate-500 space-y-1">
                <div className="flex justify-between">
                    <span>Ngày tạo:</span>
                    <span className="font-mono">{note.createdAt}</span>
                </div>
                <div className="flex justify-between">
                    <span>Cập nhật:</span>
                    <span className="font-mono">{note.updatedAt}</span>
                </div>
            </div>
        </div>
    )
}