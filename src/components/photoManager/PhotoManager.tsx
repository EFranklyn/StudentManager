import React, { useState, useRef, useEffect } from "react";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { Modal, Button } from "react-bootstrap";

import "./style.css";

interface PhotoManagerProps {
  photoUrl: string | null;
  error?: string;
  onlyDisplay?: boolean;
  onChange?: (newPhotoUrl: string) => void;
}

const PhotoManager: React.FC<PhotoManagerProps> = ({
  photoUrl,
  error,
  onChange,
}) => {
  const [preview, setPreview] = useState<string | null>(photoUrl);
  const [image, setImage] = useState<string | null>(null);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const cropperRef = useRef<ReactCropperElement>(null);
  const [validateError, setValidateError] = useState<string | null>(null);

  useEffect(() => {
    if (photoUrl) {
      setPreview(photoUrl);
      setImage(photoUrl);
    }
  }, [photoUrl]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    if (file) {
      if (file.size > 7 * 1024 * 1024) {
        setValidateError("O tamanho da foto não pode exceder 10MB.");
        return;
      }

      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result as string);
        setShowModal(true);
      };
      reader.readAsDataURL(file);
      event.target.value = "";
    }
  };

  const handleCrop = async () => {
    const cropper = cropperRef.current?.cropper;
    if (!cropper) return;

    const canvas = cropper.getCroppedCanvas({
      maxWidth: 1024,
      maxHeight: 1024,
    });

    canvas.toBlob(
      (blob) => {
        if (!blob) return;

        if (blob.size > 1 * 1024 * 1024) {
          const quality = Math.min(0.7, (1 * 1024 * 1024) / blob.size);
          canvas.toBlob(
            (compressedBlob) => {
              if (!compressedBlob) return;
              if (compressedBlob.size > 10 * 1024 * 1024) {
                setValidateError(
                  "Imagem muito grande após corte e compressão. Tente reduzir ainda mais."
                );
                return;
              }
              const croppedImageUrl = URL.createObjectURL(compressedBlob);
              setPreview(croppedImageUrl);
              onChange?.(croppedImageUrl);
              setShowModal(false);
            },
            "image/jpeg",
            quality
          );
        } else {
          const croppedImageUrl = URL.createObjectURL(blob);
          setPreview(croppedImageUrl);
          onChange?.(croppedImageUrl);
          setShowModal(false);
        }
      },
      "image/jpeg",
      0.7
    );
  };

  const handleClick = () => {
    inputRef.current?.click();
  };

  return (
    <div className="photo-manager d-flex flex-column align-items-center">
      {preview ? (
        <img
          src={preview}
          className="rounded-circle mb-1"
          style={{ width: "50px", height: "50px" }}
        />
      ) : (
        <div
          className="rounded-circle mb-2"
          style={{ width: "50px", height: "50px", background: "#eee" }}
        ></div>
      )}

      {(error || validateError) && (
        <small className="text-danger font-small">
          {error || validateError}
        </small>
      )}

      <button
        onClick={handleClick}
        className="btn btn-outline-primary btn-sm mb-2"
      >
        {preview ? "Trocar Foto" : "Adicionar Foto"}
      </button>

      <input
        type="file"
        accept="image/*"
        ref={inputRef}
        onChange={handleFileChange}
        className={`form-control ${error ? "is-invalid" : ""}`}
        style={{ display: "none" }}
      />

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Editar Foto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {image && (
            <Cropper
              ref={cropperRef}
              style={{ height: 300, width: "100%" }}
              initialAspectRatio={1}
              src={image}
              viewMode={1}
              guides={false}
              background={false}
              responsive={true}
              autoCropArea={1}
              aspectRatio={1}
            />
          )}
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleCrop}>
            Cortar e Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default PhotoManager;
