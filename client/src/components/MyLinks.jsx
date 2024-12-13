import React, { useState, useEffect } from 'react';
import { Button, Popover, Table, Typography } from 'antd';
import moment from 'moment';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';
import { foldersSharedWithMe } from '../apis/storage/foldersSharedWithMe';
import { DownloadOutlined } from '@ant-design/icons';


const { Title } = Typography;

const MyLinks = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await foldersSharedWithMe();
                if (response.ok) {
                    const data = await response.json();
                    console.log(data)
                    setLinks(data);
                }
            } catch (error) {
                console.error('Error fetching links:', error);
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchLinks();
        }
    }, [isAuthenticated]);

    const handleDownload = async (record) => {
        try {
            const response = await fetch(`/api/storage/download/${record.uid}/`);
            const blob = await response.blob();
            const url = window.URL.createObjectURL(blob);
            const a = document.createElement('a');
            a.href = url;
            a.download = record.file_name;
            document.body.appendChild(a);
            a.click();
            window.URL.revokeObjectURL(url);
            document.body.removeChild(a);
        } catch (error) {
            console.error('Error downloading file:', error);
        }
    };

    const columns = [
        {
            title: 'Shared By',
            key: 'shared_by',
            render: (record) => (
                <Popover 
                    content={record.user.email}
                    trigger="hover"
                >
                    <span style={{ cursor: 'pointer' }}>
                        {`${record.user.first_name} ${record.user.last_name}`}
                    </span>
                </Popover>
            ),
        },
        {
            title: 'Time',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => moment(text).fromNow(),
        },
        {
            title: 'Shareable Link',
            key: 'share_link',
            render: (record) => (
                <a href={`http://localhost:3000/shared/${record?.uid}`} target="_blank" rel="noopener noreferrer">
                    {`http://localhost:3000/shared/${record?.uid}`}
                </a>
            ),
        },
        {
            title: 'Actions',
            key: 'action',
            align: 'center',
            render: (record) => (
                <Button 
                    type="text"
                    icon={<DownloadOutlined />}
                    onClick={() => handleDownload(record)}
                    size="small"
                />
            ),
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>Shared with me</Title>
            <Table
                columns={columns}
                dataSource={links}
                loading={loading}
                rowKey="id"
                pagination={{ pageSize: 10 }}
            />
        </div>
    );
};

export default MyLinks;
