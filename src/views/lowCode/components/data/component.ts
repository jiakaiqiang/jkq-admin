import { MaterialType, MaterialProps, GroupEnum } from './type.ts'

export const commonentsData: MaterialProps[] = [
    {
        name: '文本',
        id: 1,
        icon: "icon-wenjian1",
        props: {
            pladeholder: '请输入文本',
            value: '文本'
        },
        events: {
            onChange: (e: any) => {
                console.log(e)
            },
            onInput: (e: any) => {
                console.log(e)
            }
        },
        style: {
            width: '100px',
            height: '30px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0 10px',
            fontSize: '14px',
        },
        className: 'text-class',
        type: MaterialType.Text,
        group: GroupEnum.Basic,
        // icon: 'https://img.alicdn.com/imgextra/i4/O1CN011y73J41Ffwj6h324i_!!6000000001489-2-tps-100-100.svg'
    },

    {
        name: '图片',
        icon: "icon-tupian",
        id: 2,
        className: "image-class",
        type: MaterialType.Image,
        group: GroupEnum.Basic,
        props: {
            width: '100px',
            height: '100px',
            alt: "图片",
            title: "图",
            src: 'https://img.alicdn.com/imgextra/i4/O1CN011y73J41Ffwj6h324i_!!6000000001489-2-tps-100-100.svg'
        },
        events: {
            onChange: (e: any) => {
                console.log(e)
            }
        }

    },
    {
        name: '按钮',
        id: 3,
        icon: "icon-anniu",
        type: MaterialType.Button,
        group: GroupEnum.Basic,
        className: "button-class",
        props: {
            type: 'primary',
            size: 'small',
            value: '按钮',
            disabled: false
        },
        events: {
            onClick: (e: any) => {
                console.log(e)
            }

        },
        style: {
            width: '100px',
            height: '30px',
            background: '#fff',
            border: '1px solid #ccc',
            borderRadius: '4px',
            padding: '0 10px',
            fontSize: '14px',
        },

    },
    {
        name: '图片',
        icon: "icon-tupian",
        id: 4,
        className: "image-class",
        type: MaterialType.Image,
        group: GroupEnum.Basic,
        props: {
            width: '100px',
            height: '100px',
            alt: "图片",
            title: "图",
            src: 'https://img.alicdn.com/imgextra/i4/O1CN011y73J41Ffwj6h324i_!!6000000001489-2-tps-100-100.svg'
        },
        events: {
            onChange: (e: any) => {
                console.log(e)
            }
        }

    },
    {
        name: '图片',
        icon: "icon-tupian",
        id: 5,
        className: "image-class",
        type: MaterialType.Image,
        group: GroupEnum.Basic,
        props: {
            width: '100px',
            height: '100px',
            alt: "图片",
            title: "图",
            src: 'https://img.alicdn.com/imgextra/i4/O1CN011y73J41Ffwj6h324i_!!6000000001489-2-tps-100-100.svg'
        },
        events: {
            onChange: (e: any) => {
                console.log(e)
            }
        }

    },
    {
        name: '图片',
        icon: "icon-tupian",
        id: 6,
        className: "image-class",
        type: MaterialType.Image,
        group: GroupEnum.Basic,
        props: {
            width: '100px',
            height: '100px',
            alt: "图片",
            title: "图",
            src: 'https://img.alicdn.com/imgextra/i4/O1CN011y73J41Ffwj6h324i_!!6000000001489-2-tps-100-100.svg'
        },
        events: {
            onChange: (e: any) => {
                console.log(e)
            }
        }

    },


]