import jsPDF from 'jspdf';
import '$lib/assets/fonts/Poppins-bold';
import '$lib/assets/fonts/Poppins-normal';

import { A4, MARGIN, PAGE_WRITABLE_SPACE } from './consts';

type GeneratePDFProps = {
	listRef: HTMLElement;
	rulesRef?: HTMLElement;
};

const getPDFScale = (elementWidth: number) => (A4.x - 2 * MARGIN.x) / elementWidth;

export const generatePDF = ({ listRef, rulesRef }: GeneratePDFProps) => {
	const doc = new jsPDF('p', 'pt');
	const scale = getPDFScale(listRef.clientWidth);

	doc.setFont('Poppins');
	doc.html(listRef, {
		callback: (doc2) => {
			if (rulesRef) {
				doc2.addPage();
				doc2.html(rulesRef, {
					callback: (d) => d.save(),
					html2canvas: {
						scale
					},
					autoPaging: 'text',
					margin: [MARGIN.y, MARGIN.x, MARGIN.y, MARGIN.x],
					y: (doc2.getNumberOfPages() - 1) * A4.y - MARGIN.y * (doc2.getNumberOfPages() * 2 - 2)
				});
			} else {
				doc2.save();
			}
		},
		html2canvas: {
			scale
		},
		autoPaging: 'text',
		margin: [MARGIN.y, MARGIN.x, MARGIN.y, MARGIN.x]
	});
};

export const preventElementsSplitOnPage = (elements: HTMLElement[]) => {
	const scale = getPDFScale(elements[0].clientWidth);

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
