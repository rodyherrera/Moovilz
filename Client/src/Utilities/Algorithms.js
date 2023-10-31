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

export const FormatBigNumber = (Number) => {
    if(Number > 999999999){
        return `${(Number / 1000000000).toFixed(1)}B`;
    }else if(Number > 999999){
        return `${(Number / 1000000).toFixed(1)}M`;
    }else if(Number > 999){
        return `${(Number / 1000).toFixed(1)}K`;
    }
    return Number;
};

export const Capitalize = (String) => {
    return String.charAt(0).toUpperCase() + String.slice(1);
}