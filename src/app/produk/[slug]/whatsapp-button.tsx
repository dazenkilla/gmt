
'use client';

import type { Product } from '@prisma/client';
import type { WebSettings } from '@/lib/settings';
import { Button } from '@/components/ui/button';
import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useState, useEffect } from 'react';

type WhatsAppButtonProps = {
    product: Product;
    settings: WebSettings;
};

// WhatsApp Icon SVG Component
const WhatsAppIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="1em"
      height="1em"
      fill="currentColor"
      viewBox="0 0 16 16"
      {...props}
    >
      <path d="M13.601 2.326A7.85 7.85 0 0 0 7.994 0C3.627 0 .068 3.558.064 7.926c0 1.399.366 2.76 1.057 3.965L0 16l4.204-1.102a7.9 7.9 0 0 0 3.79.965h.004c4.368 0 7.926-3.558 7.93-7.93A7.9 7.9 0 0 0 13.6 2.326zM7.994 14.521a6.6 6.6 0 0 1-3.356-.92l-.24-.144-2.494.654.666-2.433-.156-.251a6.56 6.56 0 0 1-1.007-3.505c0-3.626 2.957-6.584 6.591-6.584a6.56 6.56 0 0 1 4.66 1.931 6.56 6.56 0 0 1 1.928 4.66c-.004 3.639-2.961 6.592-6.592 6.592m3.615-4.934c-.197-.099-1.17-.578-1.353-.646-.182-.065-.315-.099-.445.099-.133.197-.513.646-.627.775-.114.133-.232.148-.43.05-.197-.1-.836-.308-1.592-.985-.59-.525-.985-1.175-1.103-1.372-.114-.198-.011-.304.088-.403.087-.088.197-.232.296-.346.1-.114.133-.198.198-.33.065-.134.034-.248-.015-.347-.05-.1-.445-1.076-.612-1.47-.16-.389-.323-.335-.445-.34-.114-.007-.247-.007-.38-.007a.73.73 0 0 0-.529.247c-.182.198-.691.677-.691 1.654s.71 1.916.81 2.049c.098.133 1.394 2.132 3.383 2.992.47.205.84.326 1.129.418.475.152.904.129 1.246.08.38-.058 1.171-.48 1.338-.943.164-.464.164-.86.114-.943s-.182-.133-.38-.232"/>
    </svg>
);


export default function WhatsAppButton({ product, settings }: WhatsAppButtonProps) {
    const [whatsappLink, setWhatsappLink] = useState('');

    useEffect(() => {
        // This code runs only on the client, after the component has mounted.
        const productUrl = window.location.href;
        const whatsappNumber = settings.whatsappSales.replace(/[^0-9]/g, '');

        let messageBody = `Yth. Tim Sales ${settings.companyName},\n\nSaya tertarik dengan produk berikut:\n- Nama Produk: ${product.title}\n- Tautan Produk: ${productUrl}`;
        
        const mainImage = (product.images as string[])?.[0];
        if (mainImage) {
            messageBody += `\n- Gambar: ${mainImage}`;
        }

        messageBody += `\n\nSaya ingin meminta informasi lebih lanjut mengenai penawaran dan ketersediaan.\n\nTerima kasih.`;

        const encodedMessage = encodeURIComponent(messageBody);
        setWhatsappLink(`https://wa.me/${whatsappNumber}?text=${encodedMessage}`);
    }, [product, settings]);

    if (!whatsappLink) {
        // Show a disabled button while the link is generated on the client
        return (
             <Button size="lg" disabled>
                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                Minta Penawaran
            </Button>
        );
    }
    
    return (
        <Button asChild size="lg">
            <Link href={whatsappLink} target="_blank" rel="noopener noreferrer">
                <WhatsAppIcon className="mr-2 h-5 w-5" />
                Minta Penawaran
            </Link>
        </Button>
    );
}
