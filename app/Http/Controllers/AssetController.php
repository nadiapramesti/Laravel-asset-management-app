<?php

namespace App\Http\Controllers;

use App\Models\Asset;
use Illuminate\Http\Request;
use Inertia\Inertia;

class AssetController extends Controller
{
    public function index()
    {
        $assets = Asset::latest()->paginate(10);

        return Inertia::render('assets/index', [
            'assets' => $assets,
        ]);
    }

    public function create()
    {
        return Inertia::render('assets/create');
    }

    public function store(Request $request)
    {
        $validated = $request->validate([
            'asset_name' => 'required|string|max:255',
            'assigned_to' => 'nullable|string|max:255',
            'status' => 'required|in:Registered,Assigned,Transfer,Maintenance,Disposed',
        ]);

        Asset::create($validated);

        return redirect()
            ->route('assets.index')
            ->with('success', 'Asset berhasil ditambahkan.');
    }

    public function edit($id)
    {
        $asset = Asset::findOrFail($id);

        return Inertia::render('assets/edit', [
            'asset' => $asset,
        ]);
    }

    public function update(Request $request, $id)
    {
        $asset = Asset::findOrFail($id);

        $validated = $request->validate([
            'asset_name' => 'required|string|max:255',
            'assigned_to' => 'nullable|string|max:255',
            'status' => 'required|in:Registered,Assigned,Transfer,Maintenance,Disposed',
        ]);

        $asset->update($validated);

        return redirect()
            ->route('assets.index')
            ->with('success', 'Asset berhasil diperbarui.');
    }

    public function destroy($id)
    {
        $asset = Asset::findOrFail($id);
        $asset->delete();

        return redirect()
            ->route('assets.index')
            ->with('success', 'Asset berhasil dihapus.');
    }
}
