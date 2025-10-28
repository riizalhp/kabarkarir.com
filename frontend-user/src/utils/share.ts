import { toast } from './toast';

export const shareLink = async (title: string, text: string) => {
  const url = window.location.href;
  
  // Cek apakah Web Share API didukung
  if (navigator.share) {
    try {
      await navigator.share({
        title: title,
        text: text,
        url: url,
      });
    } catch (error) {
      console.error('Error sharing:', error);
      // Pengguna mungkin membatalkan dialog berbagi, jadi tidak perlu toast error
    }
  } else {
    // Alternatif: salin ke clipboard untuk browser desktop
    try {
      await navigator.clipboard.writeText(url);
      toast('Link berhasil disalin ke clipboard!');
    } catch (err) {
      console.error('Failed to copy: ', err);
      toast('Gagal menyalin link.');
    }
  }
};
