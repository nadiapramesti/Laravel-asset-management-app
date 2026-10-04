import { Head, Link, useForm } from '@inertiajs/react';

export default function Create() {
    const { data, setData, post, processing, errors } = useForm({
        asset_name: '',
        assigned_to: '',
        status: 'Registered',
    });

    const submit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/assets');
    };

    const inputStyle: React.CSSProperties = {
        width: '100%',
        padding: '8px 10px',
        border: '1px solid #ccc',
        borderRadius: 6,
        fontSize: 14,
        boxSizing: 'border-box',
    };

    return (
        <>
            <Head title="Tambah Asset" />
            <div style={{ maxWidth: 480, margin: '0 auto', padding: 24, fontFamily: 'Arial, sans-serif' }}>
                <h1 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20 }}>Tambah Asset</h1>

                <form onSubmit={submit} style={{ display: 'flex', flexDirection: 'column', gap: 14 }}>
                    <div>
                        <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>Nama Asset</label>
                        <input
                            style={inputStyle}
                            value={data.asset_name}
                            onChange={(e) => setData('asset_name', e.target.value)}
                            placeholder="Contoh: Laptop Dell XPS 13"
                        />
                        {errors.asset_name && <p style={{ color: '#b91c1c', fontSize: 12 }}>{errors.asset_name}</p>}
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>Ditugaskan ke (opsional)</label>
                        <input
                            style={inputStyle}
                            value={data.assigned_to}
                            onChange={(e) => setData('assigned_to', e.target.value)}
                            placeholder="Nama karyawan / departemen"
                        />
                        {errors.assigned_to && <p style={{ color: '#b91c1c', fontSize: 12 }}>{errors.assigned_to}</p>}
                    </div>

                    <div>
                        <label style={{ display: 'block', fontSize: 13, marginBottom: 4 }}>Status</label>
                        <select
                            style={inputStyle}
                            value={data.status}
                            onChange={(e) => setData('status', e.target.value)}
                        >
                            <option value="Registered">Registered</option>
                            <option value="Assigned">Assigned</option>
                            <option value="Transfer">Transfer</option>
                            <option value="Maintenance">Maintenance</option>
                            <option value="Disposed">Disposed</option>
                        </select>
                        {errors.status && <p style={{ color: '#b91c1c', fontSize: 12 }}>{errors.status}</p>}
                    </div>

                    <div style={{ display: 'flex', gap: 8, marginTop: 8 }}>
                        <Link
                            href="/assets"
                            style={{ padding: '8px 16px', border: '1px solid #ccc', borderRadius: 6, textDecoration: 'none', color: '#333', fontSize: 14 }}
                        >
                            Batal
                        </Link>
                        <button
                            type="submit"
                            disabled={processing}
                            style={{ padding: '8px 16px', background: '#1a4c8c', color: '#fff', border: 'none', borderRadius: 6, fontSize: 14, cursor: 'pointer' }}
                        >
                            {processing ? 'Menyimpan...' : 'Simpan Asset'}
                        </button>
                    </div>
                </form>
            </div>
        </>
    );
}
