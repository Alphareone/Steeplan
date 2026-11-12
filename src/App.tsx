import { useState } from 'react';
import { Hash, Volume2, LayoutGrid, MessageSquare, Plus, CheckCircle2, Sparkles, ShieldCheck } from 'lucide-react';
import { WORKSPACES, CHANNELS, INITIAL_ITEMS } from './data/mockData';
import { ViewMode, WorkItem, SpecialtyRole } from './types/steeplan';

const ROLE_BADGES: Record<SpecialtyRole, { label: string; color: string }> = {
  dev: { label: 'DEV', color: 'bg-blue-500/20 text-blue-300 border-blue-500/30' },
  design: { label: 'UI/UX', color: 'bg-pink-500/20 text-pink-300 border-pink-500/30' },
  qa: { label: 'QA', color: 'bg-amber-500/20 text-amber-300 border-amber-500/30' },
  lead: { label: 'LEAD', color: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/30' },
};

export function App() {
  const [activeWsId, setActiveWsId] = useState(WORKSPACES[0].id);
  const [activeChannelId, setActiveChannelId] = useState(CHANNELS[1].id);
  const [viewMode, setViewMode] = useState<ViewMode>('chat');
  const [items, setItems] = useState<WorkItem[]>(INITIAL_ITEMS);
  const [inputText, setInputText] = useState('');
  const [itemType, setItemType] = useState<WorkItem['type']>('message');

  const activeWs = WORKSPACES.find((w) => w.id === activeWsId)!;
  const wsChannels = CHANNELS.filter((c) => c.workspaceId === activeWsId);
  const activeChannel = wsChannels.find((c) => c.id === activeChannelId) || wsChannels[0];
  const channelItems = items.filter((item) => item.channelId === activeChannel?.id);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputText.trim() || !activeChannel) return;

    const newItem: WorkItem = {
      id: Date.now().toString(),
      channelId: activeChannel.id,
      author: 'Alphareone',
      role: 'dev',
      type: itemType,
      title: itemType !== 'message' ? inputText.slice(0, 45) : undefined,
      content: inputText,
      status: 'todo',
      timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
    };

    setItems([...items, newItem]);
    setInputText('');
  };

  const toggleStatus = (id: string) => {
    setItems(items.map((item) => {
      if (item.id !== id) return item;
      const next = item.status === 'todo' ? 'doing' : item.status === 'doing' ? 'done' : 'todo';
      return { ...item, status: next };
    }));
  };

  return (
    <div className="flex h-screen bg-zinc-950 text-zinc-100 font-sans antialiased">
      {/* COLUMNA 1: Proyectos / Espacios */}
      <aside className="w-18 bg-zinc-950 border-r border-zinc-800/80 flex flex-col items-center py-4 gap-3">
        <div className="w-11 h-11 rounded-2xl bg-indigo-600 flex items-center justify-center font-bold text-white shadow-lg shadow-indigo-500/20 mb-2">
          <Sparkles className="w-5 h-5" />
        </div>
        <div className="w-8 h-[1px] bg-zinc-800" />
        {WORKSPACES.map((ws) => (
          <button
            key={ws.id}
            onClick={() => setActiveWsId(ws.id)}
            title={ws.name}
            className={`w-11 h-11 rounded-2xl flex items-center justify-center font-semibold text-sm transition-all cursor-pointer ${
              activeWsId === ws.id
                ? `${ws.color} text-white rounded-xl scale-105`
                : 'bg-zinc-900 text-zinc-400 hover:bg-zinc-800 hover:text-zinc-100'
            }`}
          >
            {ws.initials}
          </button>
        ))}
      </aside>

      {/* COLUMNA 2: Etapas y Canales Guiados */}
      <nav className="w-64 bg-zinc-900/70 border-r border-zinc-800/80 flex flex-col">
        <header className="h-14 px-4 border-b border-zinc-800/80 flex items-center justify-between">
          <h1 className="font-semibold text-sm tracking-tight truncate">{activeWs.name}</h1>
          <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded bg-zinc-800 text-zinc-400">
            Steeplan
          </span>
        </header>

        <div className="flex-1 overflow-y-auto p-3 space-y-5">
          {['Planificación', 'Diseño & UX', 'Desarrollo', 'Calidad & Voz'].map((category) => {
            const catChannels = wsChannels.filter((c) => c.category === category);
            if (catChannels.length === 0) return null;
            return (
              <div key={category}>
                <p className="px-2 text-[11px] font-semibold uppercase tracking-wider text-zinc-500 mb-1.5">
                  {category}
                </p>
                <div className="space-y-0.5">
                  {catChannels.map((ch) => (
                    <button
                      key={ch.id}
                      onClick={() => setActiveChannelId(ch.id)}
                      className={`w-full flex items-center gap-2 px-2.5 py-1.5 rounded-lg text-sm transition-colors cursor-pointer ${
                        activeChannel?.id === ch.id
                          ? 'bg-zinc-800 text-white font-medium'
                          : 'text-zinc-400 hover:bg-zinc-800/40 hover:text-zinc-200'
                      }`}
                    >
                      <Hash className="w-4 h-4 text-zinc-500 shrink-0" />
                      <span className="truncate">{ch.name}</span>
                    </button>
                  ))}
                </div>
              </div>
            );
          })}
        </div>

        <div className="p-3 bg-zinc-900 border-t border-zinc-800/80 flex items-center gap-2.5">
          <div className="w-8 h-8 rounded-full bg-indigo-500/20 border border-indigo-500/40 flex items-center justify-center text-xs font-bold text-indigo-300">
            AL
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-xs font-medium truncate">Alphareone</p>
            <p className="text-[11px] text-emerald-400 truncate">● Construyendo MVP</p>
          </div>
        </div>
      </nav>

      {/* COLUMNA 3: Área de Trabajo Adaptable */}
      <main className="flex-1 flex flex-col bg-zinc-950 min-w-0">
        <header className="h-14 px-6 border-b border-zinc-800/80 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Hash className="w-5 h-5 text-zinc-500 shrink-0" />
            <h2 className="font-semibold text-sm truncate">{activeChannel?.name}</h2>
            <span className="hidden md:inline text-xs text-zinc-500 truncate">
              — {activeChannel?.description}
            </span>
          </div>

          <div className="flex items-center bg-zinc-900 p-1 rounded-lg border border-zinc-800">
            <button
              onClick={() => setViewMode('chat')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'chat' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <MessageSquare className="w-3.5 h-3.5" /> Flujo
            </button>
            <button
              onClick={() => setViewMode('kanban')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'kanban' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <LayoutGrid className="w-3.5 h-3.5" /> Tablero
            </button>
            <button
              onClick={() => setViewMode('voice')}
              className={`flex items-center gap-1.5 px-2.5 py-1 rounded-md text-xs font-medium transition-colors cursor-pointer ${
                viewMode === 'voice' ? 'bg-zinc-800 text-white' : 'text-zinc-400 hover:text-zinc-200'
              }`}
            >
              <Volume2 className="w-3.5 h-3.5" /> Sala Ligera
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-6">
          {viewMode === 'chat' && (
            <div className="max-w-3xl mx-auto space-y-4">
              {channelItems.length === 0 ? (
                <div className="text-center py-16 border border-dashed border-zinc-800 rounded-xl">
                  <ShieldCheck className="w-8 h-8 text-zinc-600 mx-auto mb-2" />
                  <p className="text-sm text-zinc-400">Este canal está listo para comenzar.</p>
                  <p className="text-xs text-zinc-500 mt-1">
                    Usa las etiquetas inferiores para registrar una tarea, entrega UI/UX o reporte QA.
                  </p>
                </div>
              ) : (
                channelItems.map((item) => (
                  <div
                    key={item.id}
                    className="p-4 rounded-xl bg-zinc-900/60 border border-zinc-800/80 hover:border-zinc-700 transition-colors"
                  >
                    <div className="flex items-center justify-between mb-2">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold text-sm">{item.author}</span>
                        <span className={`text-[10px] px-1.5 py-0.5 rounded border font-medium ${ROLE_BADGES[item.role].color}`}>
                          {ROLE_BADGES[item.role].label}
                        </span>
                        <span className="text-[11px] text-zinc-500">{item.timestamp}</span>
                      </div>

                      {item.type !== 'message' && (
                        <button
                          onClick={() => toggleStatus(item.id)}
                          className="flex items-center gap-1 text-xs px-2 py-0.5 rounded bg-zinc-800 hover:bg-zinc-700 text-zinc-300 cursor-pointer"
                        >
                          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                          {item.status === 'todo' ? 'Pendiente' : item.status === 'doing' ? 'En Curso' : 'Completado'}
                        </button>
                      )}
                    </div>
                    {item.title && <p className="font-medium text-sm text-indigo-300 mb-1">{item.title}</p>}
                    <p className="text-sm text-zinc-300 leading-relaxed">{item.content}</p>
                  </div>
                ))
              )}
            </div>
          )}

          {viewMode === 'kanban' && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 h-full">
              {(['todo', 'doing', 'done'] as const).map((status) => (
                <div key={status} className="bg-zinc-900/40 border border-zinc-800/80 rounded-xl p-4 flex flex-col">
                  <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 mb-3">
                    {status === 'todo' ? 'Por Hacer' : status === 'doing' ? 'En Progreso' : 'Listo / Aprobado'}
                  </h3>
                  <div className="space-y-2.5 flex-1">
                    {channelItems
                      .filter((i) => i.status === status)
                      .map((item) => (
                        <div
                          key={item.id}
                          onClick={() => toggleStatus(item.id)}
                          className="p-3 rounded-lg bg-zinc-900 border border-zinc-800 hover:border-indigo-500/50 cursor-pointer transition-all"
                        >
                          <span className={`text-[10px] px-1.5 py-0.5 rounded border ${ROLE_BADGES[item.role].color}`}>
                            {ROLE_BADGES[item.role].label}
                          </span>
                          <p className="text-sm font-medium mt-2">{item.title || item.content}</p>
                          <p className="text-xs text-zinc-500 mt-1">{item.author}</p>
                        </div>
                      ))}
                  </div>
                </div>
              ))}
            </div>
          )}

          {viewMode === 'voice' && (
            <div className="max-w-lg mx-auto text-center py-12 bg-zinc-900/50 border border-zinc-800 rounded-2xl p-6">
              <Volume2 className="w-10 h-10 text-indigo-400 mx-auto mb-3" />
              <h3 className="font-semibold text-base">Sala de Sincronización Ligera</h3>
              <p className="text-xs text-zinc-400 mt-1 mb-5">
                Audio de baja latencia y pantalla compartida para Pair Programming o revisión de Figma sin consumir recursos.
              </p>
              <button className="px-4 py-2 rounded-lg bg-indigo-600 hover:bg-indigo-500 text-sm font-medium text-white cursor-pointer">
                Unirse a la sala de voz
              </button>
            </div>
          )}
        </div>

        {viewMode !== 'voice' && (
          <form onSubmit={handleSend} className="p-4 border-t border-zinc-800/80 bg-zinc-950">
            <div className="max-w-3xl mx-auto flex flex-col gap-2">
              <div className="flex items-center gap-1.5">
                {(['message', 'task', 'handoff', 'bug'] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => setItemType(type)}
                    className={`text-[11px] px-2.5 py-1 rounded-md border transition-colors cursor-pointer ${
                      itemType === type
                        ? 'bg-indigo-600/20 border-indigo-500/50 text-indigo-300 font-medium'
                        : 'bg-zinc-900 border-zinc-800 text-zinc-400 hover:text-zinc-200'
                    }`}
                  >
                    {type === 'message' && '💬 Mensaje'}
                    {type === 'task' && '⚡ Tarea Dev'}
                    {type === 'handoff' && '🎨 Entrega UI/UX'}
                    {type === 'bug' && '🐞 Reporte QA'}
                  </button>
                ))}
              </div>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={inputText}
                  onChange={(e) => setInputText(e.target.value)}
                  placeholder={`Registrar ${itemType} en #${activeChannel?.name}...`}
                  className="flex-1 bg-zinc-900 border border-zinc-800 rounded-xl px-4 py-2.5 text-sm text-zinc-100 placeholder-zinc-500 focus:outline-none focus:border-indigo-500"
                />
                <button
                  type="submit"
                  className="px-4 py-2.5 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-sm font-medium flex items-center gap-1.5 cursor-pointer"
                >
                  <Plus className="w-4 h-4" /> Enviar
                </button>
              </div>
            </div>
          </form>
        )}
      </main>
    </div>
  );
}

export default App;
