"use client"

import { useState } from 'react';
import styles from './globals.css'
import Image from 'next/image';
import {signJwt} from "@/lib/jwt"

export default function Home() {
  const [imageSrc, setImageSrc] = useState();
  const [uploadData, setUploadData] = useState();

  /**
   * handleOnChange
   * @description Triggers when the file input changes (ex: when a file is selected)
   */
  
  console.log("the token " signJwt({id:'65fd9933b82960c2f090074e',email:"sahnouneaya15@gmail.com"}));


  function handleOnChange(changeEvent) {
    const reader = new FileReader();

    reader.onload = function(onLoadEvent) {
      setImageSrc(onLoadEvent.target.result);
      setUploadData(undefined);
    }

    reader.readAsDataURL(changeEvent.target.files[0]);
  }

  /**
   * handleOnSubmit
   * @description Triggers when the main form is submitted
   */

  async function handleOnSubmit(event) {
    event.preventDefault();

    const form = event.currentTarget;
    const fileInput = Array.from(form.elements).find(({ name }) => name === 'file');

    const formData = new FormData();

    for ( const file of fileInput.files ) {
      formData.append('file', file);
    }

    formData.append('upload_preset', 'my-uploads');

    const data = await fetch('https://api.cloudinary.com/v1_1/dwldlw0bz/image/upload', {
      method: 'POST',
      body: formData
    }).then(r => r.json());

    setImageSrc(data.secure_url);
    setUploadData(data);
  }


  return (
    <div className={styles.container}>

      < main className={styles.main}>
        <h1 className={styles.title}>
          Image Uploader
        </h1>

        <p className={styles.description}>
          Upload your image to Cloudinary!
        </p>

        <form className={styles.form} method="post" onChange={handleOnChange} onSubmit={handleOnSubmit}>
          <p>
            <input type="file" name="file" />
          </p>
          
          <Image src={imageSrc} alt="" width={500} height={500}/>
          
          {imageSrc && !uploadData && (
            <p>
              <button type='submit'>Upload Files</button>
            </p>
          )}

        </form>
      </main>

    </div>
  )
}
