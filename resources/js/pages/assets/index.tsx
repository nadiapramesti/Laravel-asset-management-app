import { Head, Link, router } from '@inertiajs/react';

interface Asset {
    id: number;
    asset_name: string;
    assigned_to: string | null;
    status: 'Registered' | 'Assigned' | 'Transfer' | 'Maintenance' | 'Disposed';
}

interface PaginationLink {
    url: string | null;
    label: string;
    active: boolean;
}

interface PaginatedAsset {
    data: Asset[];
    links: PaginationLink[];
}

interface Props {
    assets: PaginatedAsset;
}

export default function Index({ assets }: Props) {
    const deleteAsset = (id: number) => {
        if (confirm('Apakah Anda yakin ingin menghapus asset ini?')) {
            router.delete(`/assets/${id}`);
        }
    };

    return (
        <>
            <Head title="Asset Management" />
            <div style={{ maxWidth: 900, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                    <h1 style={{ fontSize: 20, fontWeight: 700 }}>Daftar Asset</h1>
                    <Link
                        href="/assets/create"
                        style={{ background: '#1a4c8c', color: '#fff', padding: '8px 16px', borderRadius: 6, textDecoration: 'none', fontSize: 14, fontWeight: 600 }}
                    >
                        + Tambah Asset
                    </Link>
                </div>

                <div style={{ border: '1px solid #ddd', borderRadius: 8, overflow: 'hidden' }}>
                    <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: 14 }}>
                        <thead>
                            <tr style={{ background: '#f4f6f8', textAlign: 'left' }}>
                                <th style={{ padding: '10px 12px' }}>ID</th>
                                <th style={{ padding: '10px 12px' }}>Nama</th>
                                <th style={{ padding: '10px 12px' }}>Status</th>
                                <th style={{ padding: '10px 12px' }}>Ditugaskan ke</th>
                                <th style={{ padding: '10px 12px', textAlign: 'right' }}>Aksi</th>
                            </tr>
                        </thead>
                        <tbody>
                            {assets.data.length === 0 ? (
                                <tr>
                                    <td colSpan={5} style={{ padding: 24, textAlign: 'center', color: '#777' }}>
                                        Belum ada data asset.
                                    </td>
                                </tr>
                            ) : (
                                assets.data.map((asset) => (
                                    <tr key={asset.id} style={{ borderTop: '1px solid #eee' }}>
                                        <td style={{ padding: '10px 12px' }}>{asset.id}</td>
                                        <td style={{ padding: '10px 12px', fontWeight: 500 }}>{asset.asset_name}</td>
                                        <td style={{ padding: '10px 12px' }}>{asset.status}</td>
                                        <td style={{ padding: '10px 12px' }}>{asset.assigned_to ?? '-'}</td>
                                        <td style={{ padding: '10px 12px', textAlign: 'right' }}>
                                            <Link
                                                href={`/assets/${asset.id}/edit`}
                                                style={{ marginRight: 8, color: '#1a4c8c', textDecoration: 'underline', fontSize: 13 }}
                                            >
                                                Edit
                                            </Link>
                                            <button
                                                onClick={() => deleteAsset(asset.id)}
                                                style={{ color: '#b91c1c', background: 'none', border: 'none', cursor: 'pointer', fontSize: 13, textDecoration: 'underline' }}
                                            >
                                                Hapus
                                            </button>
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>

                <div style={{ marginTop: 16, display: 'flex', gap: 8 }}>
                    {assets.links.map((link, index) => (
                        <button
                            key={index}
                            disabled={!link.url}
                            onClick={() => link.url && router.visit(link.url)}
                            style={{
                                padding: '6px 10px',
                                fontSize: 13,
                                borderRadius: 6,
                                border: '1px solid #ddd',
                                background: link.active ? '#1a4c8c' : '#fff',
                                color: link.active ? '#fff' : '#333',
                                cursor: link.url ? 'pointer' : 'default',
                            }}
                            dangerouslySetInnerHTML={{ __html: link.label }}
                        />
                    ))}
                </div>
            </div>
        </>
    );
}
