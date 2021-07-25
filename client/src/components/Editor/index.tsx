import React, { FC, useEffect, useRef, useCallback } from 'react'

import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useDispatch } from 'react-redux';
import { setAlertFailure, setAlertLoading, unsetAlertLoading } from '../../redux/actions/AlertAction';
import { checkImage, imageUpload } from '../../utils/ImageUpload';

type EditorProps = {
  setBody: (body: string) => void;
}

export const Editor: FC<EditorProps> = ({ setBody }) => {
  const quillRef = useRef<ReactQuill>(null);
  const dispatch = useDispatch();
  const modules = { toolbar: { container } };
  const handleChange = (data: string) => {
    setBody(data);
    console.log(data);
  }

  const handleChangeImage = useCallback(() => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.multiple = true;
    input.click();

    input.onchange = async () => {
      const files = input.files;

      if (!files) {
        return dispatch(setAlertFailure('Файл не существует'));
      };

      let msg;
      Array.from(files)?.forEach((file) => {
        msg = checkImage(file);
        if (msg) {
          return dispatch(setAlertFailure(msg));
        }
      });
      dispatch(setAlertLoading());
      const photos = await imageUpload(null, Array.from(files));
      dispatch(unsetAlertLoading());

      const quill = quillRef.current;
      const range = quill?.getEditor().getSelection()?.index;
      if (range !== undefined) {
        photos.forEach(photo => quill?.getEditor().insertEmbed(range, 'image', `${photo.url}`))
      }
    }

  }, [dispatch]);

  useEffect(() => {

    const quill = quillRef?.current;

    if (!quill) return;

    let toolbar = quill.getEditor().getModule('toolbar');
    toolbar.addHandler('image', handleChangeImage);
  }, [quillRef, handleChangeImage])

  return (
    <div>
      <ReactQuill
        theme="snow"
        modules={modules}
        onChange={handleChange}
        ref={quillRef}
      />
    </div>
  );
}

let container = [
  ['bold', 'italic', 'underline', 'strike'],        // toggled buttons
  ['blockquote', 'code-block'],

  [{ 'header': 1 }, { 'header': 2 }],               // custom button values
  [{ 'list': 'ordered' }, { 'list': 'bullet' }],
  [{ 'script': 'sub' }, { 'script': 'super' }],      // superscript/subscript
  [{ 'indent': '-1' }, { 'indent': '+1' }],          // outdent/indent
  [{ 'direction': 'rtl' }],                         // text direction

  [{ 'size': ['small', false, 'large', 'huge'] }],  // custom dropdown
  [{ 'header': [1, 2, 3, 4, 5, 6, false] }],

  [{ 'color': [] }, { 'background': [] }],          // dropdown with defaults from theme
  [{ 'font': [] }],
  [{ 'align': [] }],

  ['clean', 'link', 'image', 'video']                                      // remove formatting button
];