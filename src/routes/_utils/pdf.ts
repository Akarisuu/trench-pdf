import jsPDF, { type HTMLOptions } from 'jspdf';
import '$lib/assets/fonts/Poppins-bold';
import '$lib/assets/fonts/Poppins-normal';

import { A4, MARGIN, PAGE_WRITABLE_SPACE } from './consts';

const margin = [MARGIN.y, MARGIN.x, MARGIN.y, MARGIN.x];

const getPDFScale = (elementWidth: number) => (A4.x - 2 * MARGIN.x) / elementWidth;
const getDefaultPDFOptions = (scale: number): HTMLOptions => ({
	html2canvas: {
		scale
	},
	autoPaging: 'text',
	margin
});

type AddSeparateRulesProps = {
	doc: jsPDF;
	weaponsWrapperRef: HTMLElement;
	scale: number;
};

const addSeparateRules = ({ doc, weaponsWrapperRef, scale }: AddSeparateRulesProps) => {
	doc.addPage();
	const numberOfPages = doc.getNumberOfPages();

	doc.html(weaponsWrapperRef, {
		...getDefaultPDFOptions(scale),
		callback: (d) => d.save(),
		y: (numberOfPages - 1) * A4.y - MARGIN.y * (numberOfPages * 2 - 2)
	});
};

type GeneratePDFProps = {
	mainSheetWrapperRef: HTMLElement;
	weaponsWrapperRef?: HTMLElement;
};

export const generatePDF = ({ mainSheetWrapperRef, weaponsWrapperRef }: GeneratePDFProps) => {
	const doc = new jsPDF('p', 'pt');
	const scale = getPDFScale(mainSheetWrapperRef.clientWidth);
	const anyWeaponsDefined = weaponsWrapperRef?.hasChildNodes();

	doc.setFont('Poppins');
	doc.html(mainSheetWrapperRef, {
		...getDefaultPDFOptions(scale),
		callback: (doc2) => {
			if (!weaponsWrapperRef || !anyWeaponsDefined) return doc2.save();
			return addSeparateRules({ doc: doc2, weaponsWrapperRef, scale });
		}
	});
};

export const preventElementsSplitOnPage = (element: HTMLElement) => {
	const elements = Array.from(element.children) as HTMLElement[];
	const scale = getPDFScale(element.clientWidth);

	let cumulativeHeight = 0;
	for (const el of elements) {
		const scaledHeight = Math.ceil((cumulativeHeight + el.clientHeight) * scale);

		if (scaledHeight > PAGE_WRITABLE_SPACE) {
			const marginHeight = Math.abs(
				Math.ceil(A4.y - MARGIN.y * 2 - cumulativeHeight * scale) / scale
			);

			el.style.marginTop = `${marginHeight}px`;
			cumulativeHeight = el.clientHeight;
		} else {
			el.style.marginTop = `0px`;
			cumulativeHeight += el.clientHeight;
		}
	}
};
