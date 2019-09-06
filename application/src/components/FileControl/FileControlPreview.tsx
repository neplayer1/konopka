import React, {FC} from 'react';

type TProps = {
  src: string;
  draggable?: boolean;
  dataUrl?: string;
  dataIndex?: number;
  onDelete?: (event: any) => void;
  onDragStart?: (event: any) => void;
  onDragOver?: (event: any) => void;
  onDragEnter?: (event: any) => void;
  onDragLeave?: (event: any) => void;
  onDrop?: (event: any) => void;
  onDragEnd?: (event: any) => void;
};

export const FileControlPreview: FC<TProps> = (props) => {
  const { dataUrl, dataIndex, src, draggable, onDelete, onDragStart, onDragOver, onDragEnter, onDragLeave, onDrop, onDragEnd } = props;

  return (
    <div className="dropzone_preview__item" draggable={draggable}
         onDragStart={onDragStart && ((e) => onDragStart(e))}
         onDragOver={onDragOver && ((e) => onDragOver(e))}
         onDragEnter={onDragEnter && ((e) => onDragEnter(e))}
         onDragLeave={onDragLeave && ((e) => onDragLeave(e))}
         onDrop={onDrop && ((e) => onDrop(e))}
         onDragEnd={onDragEnd && ((e) => onDragEnd(e))}
    >
      <div className="dropzone_preview_item__inner">
        {onDelete && <div className="dropzone_preview_item__delete-btn" onClick={(e) => onDelete(e)}/>}
        <img src={src} data-index={dataIndex} data-url={dataUrl} alt={''}/>
      </div>
    </div>
  );
}
