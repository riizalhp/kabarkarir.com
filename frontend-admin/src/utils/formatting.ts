/**
 * Memformat string imbalan dengan menambahkan pemisah ribuan pada angka.
 * Contoh: "Saldo Koin Rp 10000" menjadi "Saldo Koin Rp 10.000"
 * @param rewardString String imbalan yang akan diformat.
 * @returns String imbalan yang sudah diformat.
 */
export const formatRewardString = (rewardString: string): string => {
  if (!rewardString) {
    return '';
  }

  // Regex untuk menemukan angka dalam string (termasuk yang sudah ada titiknya)
  const numberRegex = /(\d{1,3}(?:[.,]\d{3})*|\d+)/;
  
  const match = rewardString.match(numberRegex);
  
  if (match) {
    // Menghapus titik atau koma yang sudah ada untuk normalisasi
    const numberPart = match[0].replace(/[.,]/g, '');
    const number = parseInt(numberPart, 10);

    if (!isNaN(number)) {
      // Format angka menggunakan lokal Indonesia
      const formattedNumber = number.toLocaleString('id-ID');
      // Ganti angka asli dalam string dengan yang sudah diformat
      return rewardString.replace(match[0], formattedNumber);
    }
  }

  // Jika tidak ada angka yang ditemukan atau tidak valid, kembalikan string asli
  return rewardString;
};

/**
 * Mengubah format tanggal dari YYYY-MM-DD atau format lain menjadi 'DD NamaBulan YYYY'.
 * Contoh: "2024-12-31" menjadi "31 Desember 2024"
 * @param dateString String tanggal (misal: '2024-12-31' atau '31 Des 2024').
 * @returns String tanggal yang sudah diformat atau string asli jika format tidak dikenali.
 */
export const formatDisplayDate = (dateString: string | undefined): string => {
  if (!dateString) return '';

  // Coba parsing tanggal. JavaScript Date object cukup fleksibel.
  const date = new Date(dateString);

  // Periksa apakah tanggal valid setelah parsing
  if (isNaN(date.getTime())) {
    // Jika parsing gagal, coba parsing manual untuk format '31 Des 2024'
    const months: { [key: string]: number } = {
      'Jan': 0, 'Feb': 1, 'Mar': 2, 'Apr': 3, 'Mei': 4, 'Jun': 5,
      'Jul': 6, 'Agu': 7, 'Sep': 8, 'Okt': 9, 'Nov': 10, 'Des': 11
    };
    const parts = dateString.split(' ');
    if (parts.length === 3) {
      const day = parseInt(parts[0], 10);
      const month = months[parts[1]];
      const year = parseInt(parts[2], 10);
      if (!isNaN(day) && month !== undefined && !isNaN(year)) {
        const manualDate = new Date(year, month, day);
        if (!isNaN(manualDate.getTime())) {
          return manualDate.toLocaleDateString('id-ID', {
            day: 'numeric',
            month: 'long',
            year: 'numeric',
          });
        }
      }
    }
    return dateString; // Return original string if all parsing fails
  }

  return date.toLocaleDateString('id-ID', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
};