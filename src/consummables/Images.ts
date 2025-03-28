import { ref } from 'vue';

interface UploadOptions {
  maxSizeMB?: number;
  quality?: number;
  apiEndpoint?: string;
  authToken?: string;
}

export function useImageUploader(options: UploadOptions = {}) {
  const maxSizeMB = options.maxSizeMB || 5;
  const quality = options.quality || 0.8;
  const acceptedTypes = ['image/jpeg', 'image/png', 'image/webp'];
  const apiEndpoint = options.apiEndpoint || '/api/upload';
  const authToken = options.authToken || null;

  const error = ref<string>('');
  const imagePreview = ref<string>('');
  const webpBlob = ref<Blob | null>(null);
  const uploadStatus = ref<'idle' | 'uploading' | 'success' | 'error'>('idle');

  function reset() {
    error.value = '';
    imagePreview.value = '';
    webpBlob.value = null;
    uploadStatus.value = 'idle';
  }

  function validateFile(file: File) {
    if (!file) {
      throw new Error('Aucun fichier fourni. Cela me rappelle ma vie amoureuse.');
    }

    if (!acceptedTypes.includes(file.type)) {
      throw new Error('Format de fichier non autorisé. Merci de ne pas uploader de `.exe` déguisé.');
    }

    if (file.size > maxSizeMB * 1024 * 1024) {
      throw new Error(`Fichier trop volumineux (${(file.size / 1024 / 1024).toFixed(2)}MB).`);
    }
  }

  function convertToWebP(file: File): Promise<Blob> {
    return new Promise((resolve, reject) => {
      const img: HTMLImageElement = new Image();
      const reader = new FileReader();

      reader.onload = function (e) {
        img.src = e.target?.result?.toString() ?? '';
      };

      img.onload = function () {
        const canvas = document.createElement('canvas');
        canvas.width = img.width;
        canvas.height = img.height;
        const ctx = canvas.getContext('2d');

        ctx?.drawImage(img, 0, 0);

        canvas.toBlob(
          (blob) => {
            if (!blob) {
              reject(new Error("Échec de la conversion en WebP. Probablement l'œuvre d'un gobelin numérique."));
              return;
            }
            resolve(blob);
          },
          'image/webp',
          quality
        );
      };

      img.onerror = () => reject(new Error('Erreur lors du chargement de l’image. Vérifiez si elle vient de Pornhub.'));
      reader.onerror = () => reject(new Error('Impossible de lire le fichier. Avez-vous essayé de souffler dessus comme une cartouche de Nintendo ?'));

      reader.readAsDataURL(file);
    });
  }

  async function handleFileUpload(event: Event) {
    reset();

    const target = event.target as HTMLInputElement;
    const file = target?.files?.[0];
    try {
      if (!file) throw new Error('Aucun fichier détecté dans l’input. Peut-être est-ce un complot.');
      validateFile(file);
      imagePreview.value = URL.createObjectURL(file);
      const blob = await convertToWebP(file);
      webpBlob.value = blob;
    } catch (err: unknown) {
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Erreur inconnue, probablement causée par un chat marchant sur le clavier.';
      }
    }
  }

  async function uploadToApi() {
    if (!webpBlob.value) {
      error.value = "Aucun blob disponible à envoyer. Soit vous êtes pressé, soit vous êtes nu.";
      return;
    }

    uploadStatus.value = 'uploading';

    try {
      const formData = new FormData();
      formData.append('file', webpBlob.value, 'image.webp');

      const response = await fetch(apiEndpoint, {
        method: 'POST',
        body: formData,
        headers: {
          ...(authToken && { Authorization: `Bearer ${authToken}` }),
        },
      });

      if (!response.ok) {
        throw new Error(`Erreur serveur : ${response.statusText}`);
      }

      uploadStatus.value = 'success';
    } catch (err: unknown) {
      uploadStatus.value = 'error';
      if (err instanceof Error) {
        error.value = err.message;
      } else {
        error.value = 'Erreur inconnue pendant l’upload. Peut-être que le serveur a fui ses responsabilités.';
      }
    }
  }

  return {
    imagePreview,
    webpBlob,
    error,
    uploadStatus,
    handleFileUpload,
    uploadToApi,
    reset,
  };
}
