import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { writeProduct } from '../api/firebase';
import { imageUpload } from '../api/uploader';
import Button from '../components/Button';

const ERROR_CLASS = 'text-red-500';

interface IForm {
  title: string;
  price: string;
  category: string;
  description: string;
  options: string;
  file: any;
}

function NewProduct() {
  const [file, setFile] = useState<any>(null);
  const [success, setSuccess] = useState<null | string>(null);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm({
    defaultValues: {
      title: '',
      price: '',
      category: '',
      description: '',
      options: '',
      file: '',
    },
  });
  const registProduct = (data: IForm) => {
    setIsUploading(true);
    delete data.file;
    imageUpload(file).then((url) => {
      const product = { ...data, image: url };
      writeProduct(product).then(() => {
        setSuccess('제품이 등록되었습니다.');
        setIsUploading(false);
        setTimeout(() => {
          setSuccess(null);
        }, 3000);
      });
    });
  };

  const avatar = watch('file');
  useEffect(() => {
    const file = avatar[0];
    setFile(file);
  }, [avatar]);

  return (
    <section className="p-4">
      <p className="text-center text-2xl font-bold p-3">제품 추가하기</p>
      {success && (
        <p className="text-center text-xl font-semibold">{success}</p>
      )}
      <form onSubmit={handleSubmit(registProduct)} className="flex flex-col">
        {file && (
          <img
            className="w-96 m-auto mb-3"
            src={URL.createObjectURL(file)}
            alt="avatar"
          />
        )}
        <input type="file" {...register('file')} accept="image/*" />
        {errors.file && <p className={ERROR_CLASS}>file is required.</p>}
        <input
          {...register('title', { required: true })}
          placeholder="제품명"
          className="mt-3"
        />
        {errors.title && <p className={ERROR_CLASS}>title is required.</p>}
        <input
          {...register('price', { required: true })}
          placeholder="가격"
          className="mt-3"
        />
        {errors.price && <p className={ERROR_CLASS}>price is required.</p>}
        <input
          {...register('category', { required: true })}
          placeholder="카테고리"
          className="mt-3"
        />
        {errors.category && (
          <p className={ERROR_CLASS}>category is required.</p>
        )}
        <input
          {...register('options', { required: true })}
          placeholder="옵션"
          className="mt-3"
        />
        {errors.options && <p className={ERROR_CLASS}>options is required.</p>}
        <input
          {...register('description', { required: true })}
          placeholder="제품설명"
          className="mt-3"
        />
        {errors.description && (
          <p className={`${ERROR_CLASS}`}>description is required.</p>
        )}
        <Button
          disabled={isUploading}
          text="제품 등록하기"
          buttonStyle="mt-3"
        ></Button>
      </form>
    </section>
  );
}

export default NewProduct;
