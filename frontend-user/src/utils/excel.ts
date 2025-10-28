// Beri tahu TypeScript tentang objek XLSX global dari CDN
declare const XLSX: any;

/**
 * Membuat dan mengunduh file template Excel (.xlsx).
 * @param columns - Array string yang akan menjadi header kolom.
 * @param fileName - Nama file yang akan diunduh (tanpa ekstensi .xlsx).
 */
export const downloadExcelTemplate = (columns: string[], fileName:string) => {
  try {
    // Pastikan library XLSX tersedia
    if (typeof XLSX === 'undefined') {
      console.error("XLSX library is not loaded. Make sure it's included in your HTML.");
      alert("Gagal membuat file Excel. Library XLSX tidak ditemukan.");
      return;
    }

    // Buat worksheet hanya dengan baris header
    const ws = XLSX.utils.aoa_to_sheet([columns]);
    
    // Buat workbook baru
    const wb = XLSX.utils.book_new();
    
    // Tambahkan worksheet ke workbook
    XLSX.utils.book_append_sheet(wb, ws, 'Template');
    
    // Tulis file dan picu unduhan
    XLSX.writeFile(wb, `${fileName}.xlsx`);
  } catch (error) {
    console.error("Error creating Excel template:", error);
    alert("Terjadi kesalahan saat membuat template Excel.");
  }
};
