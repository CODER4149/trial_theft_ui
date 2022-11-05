import { Tabs } from 'antd';
import React from 'react';
import DemoPie from "./Masters/AllFIles/DaywiseComGraph";

const onChange = (key) => {
    console.log(key);
};

const tabs = () => (
    <Tabs
        onChange={onChange}
        type="card"
        items={new Array(1).fill(null).map((_, i) => {
            const id = String(i + 1);
            return {
                label: `Tab ${id}`,
                key: id,
                children: <DemoPie />,
            };
        })}
    />
);

export default tabs;