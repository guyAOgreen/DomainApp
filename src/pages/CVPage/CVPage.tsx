import PdfViewer from "../../components/PdfViewer/PdfViewer";

const CvPage = () => {
    const pdfUrl = '/cv.pdf'; 
    return (
        <>
            <div className="title">
                {"My CV"}
            </div>
            <div className="pdf-container">
                <PdfViewer pdfUrl={pdfUrl}/>
            </div>
        </>
        
    );
};

export default CvPage;