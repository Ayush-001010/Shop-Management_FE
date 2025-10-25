import React, { useEffect, useState } from 'react';
import type IShopCardsItem from './IShopCardsItem';
import { Button, Collapse } from 'antd';
import ShopCardHeader from './ShopCardHeader/ShopCardHeader';
import ShopCardContent from './ShopCardContent/ShopCardContent';
import { MenuOutlined } from '@ant-design/icons';

const ShopCardsItems : React.FunctionComponent<IShopCardsItem> = ({noOfForms , formFieldsConfig , formik , decreaseNoOfForms , options , isUserDetailsRequired }) => {
    const [items , setItems] = useState<Array<any>>([]);

    const generateItems = () => {
        const newItems = [];
        for (let i = 0; i < noOfForms; i++) {
            const item = {
                key: i,
                label: <ShopCardHeader shopNumber={i+1} formik={formik} formFieldsConfig={formFieldsConfig} decreaseNoOfForms={decreaseNoOfForms} isUserDetailsRequired={isUserDetailsRequired} />,
                children: <ShopCardContent isUserDetailsRequired={isUserDetailsRequired} items={formFieldsConfig.sections} shopNumber={i+1} formik={formik} options={options} />
            };
            newItems.push(item);
        }
        setItems(newItems);
    }
    const expandIcon = () => (
        <div className='mt-4'>
          <Button shape="circle" icon={<MenuOutlined />} />
        </div>
      );
      
      
    useEffect(() => {
        generateItems();
    } , [noOfForms , formFieldsConfig , formik]);
    return (
        <div>
            <Collapse items={items} expandIcon={() => expandIcon()}  expandIconPosition='end'  />
        </div>
    )
};

export default ShopCardsItems;