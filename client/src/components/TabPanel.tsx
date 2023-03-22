interface TabPanelProps {
    children?: React.ReactNode;
    dir?: string;
    index: number;
    value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({
    dir,
    index,
    value,
    children,
    ...other
}) => {
    return (
        <div
            role='tabpanel'
            hidden={value !== index}
            id={`full-width-tabpanel-${index}`}
            aria-labelledby={`full-width-tab-${index}`}
            {...other}
            className={
                'h-[calc(100%-48px)] box-border overflow-auto scrollbar bg-slate-50 shadow p-5'
            }
        >
            {children}
        </div>
    );
};

export default TabPanel;
