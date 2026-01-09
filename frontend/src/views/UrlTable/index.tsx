import { useEffect, useState } from "react";
import { Copy, ExternalLink, Trash2, Calendar } from "lucide-react";
import { useUrlList } from "../../features/url-shortener/hooks/useUrlList";
import type { UrlItem } from "../../features/url-shortener/types/url.types";

export function UrlTable() {
    const [urls, setUrls] = useState<UrlItem[]>([]);
    const [loading, setLoading] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [totalPages, setTotalPages] = useState<number>(1);
    const [copiedId, setCopiedId] = useState<string | null>(null);
    const { fetchUrls } = useUrlList();
    const pageSize = 10;

    useEffect(() => { 
        getUrls(); 
    }, [currentPage]);

    const getUrls = async (): Promise<void> => {
        setLoading(true);
        try {
            const response = await fetchUrls(currentPage, pageSize);
            setUrls(response.urls?.urls);
            setTotalPages(response.total_pages);
        } catch (error) {
            console.error("Error fetching URLs:", error);
        } finally {
            setLoading(false);
        }
    };

    const copyToClipboard = async (shortCode: string, id: string): Promise<void> => {
        const shortUrl = `${window.location.origin}/${shortCode}`;
        try {
            await navigator.clipboard.writeText(shortUrl);
            setCopiedId(id);
            setTimeout(() => setCopiedId(null), 2000);
        } catch (err) {
            console.error('Erro ao copiar:', err);
        }
    };

    const handleDelete = async (shortCode: string): Promise<void> => {
        if (confirm('Deseja realmente deletar esta URL?')) {
            // Implemente a lógica de delete aqui
            // await deleteUrl(shortCode);
            setUrls(urls.filter(url => url.short_code !== shortCode));
        }
    };

    const formatDate = (dateString: string): string => {
        const date = new Date(dateString);
        return date.toLocaleDateString('pt-BR', { 
            day: '2-digit', 
            month: '2-digit', 
            year: 'numeric' 
        });
    };

    const truncateUrl = (url: string, maxLength: number = 50): string => {
        return url.length > maxLength ? url.substring(0, maxLength) + '...' : url;
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <div className="text-gray-500">Carregando...</div>
            </div>
        );
    }

    return (
        <div className="w-full max-w-6xl mx-auto p-6">
            <div className="mb-6">
                <h1 className="text-2xl font-bold text-gray-800">Minhas URLs</h1>
                <p className="text-gray-600 mt-1">Total: {urls.length} URLs</p>
            </div>

            {/* Grid de URLs */}
            <div className="bg-white rounded-lg shadow overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gray-50 border-b border-gray-200">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    URL Original
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    URL Curta
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Criada em
                                </th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                    Ações
                                </th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {urls.map((url) => (
                                <tr key={url.short_code} className="hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <a 
                                                href={url.original_url}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="text-blue-600 hover:text-blue-800 hover:underline"
                                                title={url.original_url}
                                            >
                                                {truncateUrl(url.original_url, 40)}
                                            </a>
                                            <ExternalLink className="w-4 h-4 text-gray-400" />
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-2">
                                            <code className="bg-gray-100 px-2 py-1 rounded text-sm font-mono">
                                                {url.short_code}
                                            </code>
                                            <button
                                                onClick={() => copyToClipboard(url.short_code, url.short_code)}
                                                className="p-1 hover:bg-gray-200 rounded transition-colors"
                                                title="Copiar URL curta"
                                            >
                                                {copiedId === url.short_code ? (
                                                    <span className="text-green-600 text-xs font-medium">✓</span>
                                                ) : (
                                                    <Copy className="w-4 h-4 text-gray-600" />
                                                )}
                                            </button>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 text-sm text-gray-500">
                                        <div className="flex items-center gap-1">
                                            <Calendar className="w-4 h-4" />
                                            {url.created_at ? formatDate(url.created_at) : '-'}
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <button
                                            onClick={() => handleDelete(url.short_code)}
                                            className="text-red-600 hover:text-red-800 hover:bg-red-50 p-2 rounded transition-colors"
                                            title="Deletar URL"
                                        >
                                            <Trash2 className="w-4 h-4" />
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Paginação */}
            {totalPages > 1 && (
                <div className="mt-6 flex items-center justify-between">
                    <div className="text-sm text-gray-600">
                        Página {currentPage} de {totalPages}
                    </div>
                    <div className="flex gap-2">
                        <button
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Anterior
                        </button>
                        <button
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                        >
                            Próxima
                        </button>
                    </div>
                </div>
            )}

            {/* Estado vazio */}
            {urls.length === 0 && (
                <div className="text-center py-12">
                    <p className="text-gray-500">Nenhuma URL encontrada</p>
                </div>
            )}
        </div>
    );
}