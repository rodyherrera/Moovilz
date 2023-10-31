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

import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react-swc';

export default defineConfig({
   plugins: [react()],
   server: {
      host: '0.0.0.0',
      port: 5000
   },
   resolve: {
      alias: {
         '@': '/src',
         '@Services': '/src/Services',
         '@Components': '/src/Components',
         '@Pages': '/src/Pages',
         '@Utilities': '/src/Utilities',
         '@Hooks': '/src/Hooks',
         '@Assets': '/src/Assets',
         '@Styles': '/src/Assets/StyleSheet',
      }
   },
});
