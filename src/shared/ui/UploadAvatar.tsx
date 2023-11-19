import React, { useEffect, useState } from 'react';
import { LoadingOutlined, PlusOutlined } from '@ant-design/icons';
import { message, Modal, Upload } from 'antd';
import type { UploadChangeParam } from 'antd/es/upload';
import type { RcFile, UploadFile, UploadProps } from 'antd/es/upload/interface';
import Image from 'next/image';
import { instanceApiFormData } from '../configs/instanceAxios';
import axios from 'axios';

const getBase64 = (file: RcFile): Promise<string> =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result as string);
        reader.onerror = error => reject(error);
});

const getFile = async (url: string): Promise<string | RcFile | Blob | null> => {
  const response = await axios.get(url, {
    // responseType: "blob",
    // responseEncoding: "base64",
    headers: {
      // 'Content-Type': 'image/jpeg'
      // 'Accept': '*/*',
      // 'Access-Control-Allow-Origin': '*',
      // 'Access-Control-Request-Headers:': 'access-control-allow-origin'
    },
    // withCredentials: true
  });
  // const data = await response.blob();
  // const metadata = {
  //   type: "image/jpeg,image/png"
  // }
  // const file = new)
}

const beforeUpload = (file: RcFile) => {
  const isJpgOrPng = file.type === 'image/jpeg' || file.type === 'image/png';
  if (!isJpgOrPng) {
    message.error('Вы можете загрузать только JPG/PNG файлы!');
  }
  const isLt2M = file.size / 1024 / 1024 < 2;
  if (!isLt2M) {
    message.error('Картинка должна весить менее 2 МБ!');
  }
  return isJpgOrPng && isLt2M;
};

export const UploadAvatar = ({
  onChange,
  src
}: {
  onChange: (file: string | RcFile | Blob | null) => void;
  src?: string | null
}) => {
  const [file, setFile] = useState<string | RcFile | Blob | null>(null);
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState('');
  const [previewTitle, setPreviewTitle] = useState('');

  useEffect(() => {
    if(src) {
      const avatar = getFile(src);
    }
  }, [src])

  const customRequest = ({
    onSuccess,
    file
  }: {
    onSuccess: ((body: any, xhr?: XMLHttpRequest | undefined) => void) | undefined,
    file: string | RcFile | Blob
  }) => {
    if(onSuccess) onSuccess('ok')
    setFile(file);
    onChange(file);
  }

  const handleCancel = () => setPreviewOpen(false);

  const onRemove = () => {
    setFile(null);
    onChange(null);
  }

  const handlePreview = async (file: UploadFile) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj as RcFile);
    }

    setPreviewImage(file.url || (file.preview as string));
    setPreviewOpen(true);
    setPreviewTitle(file.name || file.url!.substring(file.url!.lastIndexOf('/') + 1));
  };

  const uploadButton = (
    <div>
        <PlusOutlined />
        <div style={{ marginTop: 8 }}>Загрузить</div>
    </div>
  );

  return (
    <>
      <Upload
        name="avatar"
        listType="picture-card"
        accept = "image/jpeg,image/png"
        maxCount={1}
        beforeUpload={beforeUpload}
        customRequest={({ onSuccess, file }) => customRequest({ onSuccess, file })}
        onRemove={onRemove}
        onPreview={handlePreview}
      >
        {file ? null : uploadButton}
      </Upload>
      <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
        <img alt="example" style={{ width: '100%' }} src={previewImage} />
      </Modal>
    </>
  );
};
