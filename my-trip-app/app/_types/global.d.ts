declare module "*.css" { const content: { [className: string]: string } | string; export default content; }
declare module "*.png";
declare module "*.jpg";
declare module "*.jpeg";
declare module "*.gif";
declare module "*.svg" { const content: React.FC<React.SVGProps<SVGSVGElement>>; export default content; }
