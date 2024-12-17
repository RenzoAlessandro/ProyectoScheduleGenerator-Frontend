//import * as XLSX from 'xlsx';
import ExcelJS from 'exceljs';
import { saveAs } from 'file-saver';

// export const exportToExcelTemplate = (data, fileName = 'archivo.xlsx') => {
//    // Define los encabezados
//    const worksheetData = [['ID', 'Nombres', 'Apellidos', 'Edad']]

//      // Crear una hoja de trabajo (worksheet) manualmente
//   const worksheet = XLSX.utils.aoa_to_sheet(worksheetData);
 
//    // Crear un libro de trabajo (workbook) y agregar la hoja
//    const workbook = XLSX.utils.book_new();
//    XLSX.utils.book_append_sheet(workbook, worksheet, 'Plantilla');
 
//    // Generar un archivo Excel (.xlsx)
//    const excelBuffer = XLSX.write(workbook, { bookType: 'xlsx', type: 'array', cellStyles: true });
 
//    // Crear un archivo Blob y disparar la descarga
//    const blob = new Blob([excelBuffer], { type: 'application/octet-stream' });
//    saveAs(blob, fileName);
// };


export const exportToExcelTemplate = async (headers, fileName = 'plantilla.xlsx') => {
  // Crear un nuevo libro de trabajo
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet('Plantilla');

  // Mapear los headers para definir las columnas y ancho (opcional)
  worksheet.columns = headers.map(header => ({
    header,
    key: header.toLowerCase(),
    width: 20 // Puedes ajustar el ancho aquí según sea necesario
  }));

  // Aplicar estilo de negrita a los encabezados
  worksheet.getRow(1).font = { bold: true };

  // Generar el archivo Excel en formato Blob
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });

  // Descargar el archivo
  saveAs(blob, fileName);
};