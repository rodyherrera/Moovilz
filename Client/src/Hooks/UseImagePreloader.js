/***
 * Copyright (C) Rodolfo Herrera Hernandez. All rights reserved.
 * Licensed under the MIT license. See LICENSE file in the project root
 * for full license information.
 *
 * =+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+=+
 *
 * The Moovilz Source Code.
 * 
 * For related information - https://github.com/CodeWithRodi/Moovilz/
 * 
 * :: https://moovilz.codewithrodi.com/
 * :: https://moovilz-backend.codewithrodi.com/
 *
 * =-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-=-
****/

import { useEffect, useState } from 'react';

const PreloadImage = (Source) => new Promise((Resolve, Reject) => {
    const ApplicationImage = new Image();
    ApplicationImage.onload = () => Resolve(ApplicationImage);
    ApplicationImage.onerror = ApplicationImage.onabort = () => Reject(Source);
    ApplicationImage.src = Source;
});

const UseImagePreloader = (ImageList) => {
    const [GetImagesPreloaded, SetImagesPreloaded] = useState(false);

    useEffect(() => {
        let IsCancelled = false;
        async function Effect(){
            if(IsCancelled)
                return;
            const ImagePromiseList = [];
            for(const ApplicationImage of ImageList)
                ImagePromiseList.push(PreloadImage(ApplicationImage));
            await Promise.all(ImagePromiseList);
            if(IsCancelled)
                return;
            SetImagesPreloaded(true);
        }
        Effect();
        return () => {
            IsCancelled = true;
        };
    }, [ImageList]);

    return { GetImagesPreloaded };
};

export default UseImagePreloader;