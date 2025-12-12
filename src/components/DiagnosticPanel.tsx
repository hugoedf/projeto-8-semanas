import { useState } from 'react';
import { useDiagnosticMode, DiagnosticResult } from '@/hooks/useDiagnosticMode';
import { Button } from '@/components/ui/button';
import { X, Play, CheckCircle, XCircle, AlertTriangle, Info } from 'lucide-react';

const StatusIcon = ({ status }: { status: DiagnosticResult['status'] }) => {
  switch (status) {
    case 'success':
      return <CheckCircle className="w-4 h-4 text-green-500" />;
    case 'error':
      return <XCircle className="w-4 h-4 text-red-500" />;
    case 'warning':
      return <AlertTriangle className="w-4 h-4 text-yellow-500" />;
    case 'info':
      return <Info className="w-4 h-4 text-blue-500" />;
  }
};

export const DiagnosticPanel = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { runDiagnostic, isRunning, results, summary } = useDiagnosticMode();

  if (!isOpen) {
    return (
      <button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-4 right-4 z-50 bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded-lg shadow-lg text-sm font-medium transition-colors"
      >
        🔍 Diagnóstico
      </button>
    );
  }

  return (
    <div className="fixed inset-0 z-50 bg-black/50 flex items-center justify-center p-4">
      <div className="bg-white dark:bg-gray-900 rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-hidden flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-200 dark:border-gray-700">
          <h2 className="text-lg font-bold text-gray-900 dark:text-white">
            🔍 Diagnóstico do Funil de Eventos
          </h2>
          <button
            onClick={() => setIsOpen(false)}
            className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
          >
            <X className="w-5 h-5 text-gray-500" />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {/* Run Button */}
          <Button
            onClick={runDiagnostic}
            disabled={isRunning}
            className="w-full bg-purple-600 hover:bg-purple-700"
          >
            <Play className="w-4 h-4 mr-2" />
            {isRunning ? 'Executando diagnóstico...' : 'Executar Diagnóstico Completo'}
          </Button>

          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Este teste usa prefixo TEST_ e não afeta campanhas reais.
            Eventos são enviados como teste para a Meta.
          </p>

          {/* Results */}
          {results.length > 0 && (
            <div className="space-y-2">
              <h3 className="font-semibold text-gray-900 dark:text-white">Log de Execução:</h3>
              <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-3 space-y-2 max-h-60 overflow-y-auto font-mono text-xs">
                {results.map((result, index) => (
                  <div key={index} className="flex items-start gap-2">
                    <StatusIcon status={result.status} />
                    <div className="flex-1">
                      <span className="font-semibold text-gray-700 dark:text-gray-300">
                        [{result.step}]
                      </span>{' '}
                      <span className="text-gray-600 dark:text-gray-400">
                        {result.message}
                      </span>
                      {result.data && (
                        <pre className="mt-1 text-xs text-gray-500 dark:text-gray-500 overflow-x-auto">
                          {JSON.stringify(result.data, null, 2)}
                        </pre>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Summary */}
          {summary && (
            <div className="bg-gray-50 dark:bg-gray-800 rounded-lg p-4 space-y-3">
              <h3 className="font-semibold text-gray-900 dark:text-white">📊 Resumo:</h3>
              
              <div className="grid grid-cols-2 gap-2 text-sm">
                <div className="text-gray-600 dark:text-gray-400">Visitor ID:</div>
                <div className="font-mono text-xs text-gray-900 dark:text-white break-all">
                  {summary.visitorId}
                </div>
                
                <div className="text-gray-600 dark:text-gray-400">IP:</div>
                <div className="text-gray-900 dark:text-white">{summary.ip}</div>
                
                <div className="text-gray-600 dark:text-gray-400">Localização:</div>
                <div className="text-gray-900 dark:text-white">
                  {summary.city}, {summary.state}, {summary.country}
                </div>
                
                <div className="text-gray-600 dark:text-gray-400">UTMs:</div>
                <div className="text-gray-900 dark:text-white">
                  {Object.values(summary.utms).some(v => v) ? (
                    <span className="text-green-600">✓ Detectadas</span>
                  ) : (
                    <span className="text-yellow-600">Nenhuma</span>
                  )}
                </div>
              </div>

              <div className="border-t border-gray-200 dark:border-gray-700 pt-3 space-y-2">
                <div className="flex items-center gap-2">
                  {summary.supabaseSuccess ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Supabase INSERT
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {summary.metaCapiPageViewSuccess ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Meta CAPI PageView
                  </span>
                </div>
                
                <div className="flex items-center gap-2">
                  {summary.metaCapiViewContentSuccess ? (
                    <CheckCircle className="w-4 h-4 text-green-500" />
                  ) : (
                    <XCircle className="w-4 h-4 text-red-500" />
                  )}
                  <span className="text-sm text-gray-700 dark:text-gray-300">
                    Meta CAPI ViewContent
                  </span>
                </div>
              </div>

              {summary.metaFbtraceIds.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="text-sm text-gray-600 dark:text-gray-400">fbtrace_ids:</div>
                  <div className="font-mono text-xs text-gray-900 dark:text-white">
                    {summary.metaFbtraceIds.join(', ')}
                  </div>
                </div>
              )}

              {summary.errors.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="text-sm text-red-600 font-semibold">Erros:</div>
                  <ul className="text-xs text-red-500 list-disc list-inside">
                    {summary.errors.map((e, i) => (
                      <li key={i}>{e}</li>
                    ))}
                  </ul>
                </div>
              )}

              {summary.warnings.length > 0 && (
                <div className="border-t border-gray-200 dark:border-gray-700 pt-3">
                  <div className="text-sm text-yellow-600 font-semibold">Avisos:</div>
                  <ul className="text-xs text-yellow-500 list-disc list-inside">
                    {summary.warnings.map((w, i) => (
                      <li key={i}>{w}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">
            Verifique também o Console do navegador (F12) e os logs do Supabase Edge Functions para mais detalhes.
          </p>
        </div>
      </div>
    </div>
  );
};
