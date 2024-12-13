import React, { useState, useEffect } from 'react';
import { Table, Typography } from 'antd';
import axios from 'axios';
import { useAuth } from '../hooks/useAuth';

const { Title } = Typography;

const MyLinks = () => {
    const [links, setLinks] = useState([]);
    const [loading, setLoading] = useState(true);
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        const fetchLinks = async () => {
            try {
                const response = await axios.get('/api/links/');
                setLinks(response.data);
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

    const columns = [
        {
            title: 'File Name',
            dataIndex: 'file_name',
            key: 'file_name',
        },
        {
            title: 'Created At',
            dataIndex: 'created_at',
            key: 'created_at',
            render: (text) => new Date(text).toLocaleDateString(),
        },
        {
            title: 'Share Link',
            dataIndex: 'share_link',
            key: 'share_link',
            render: (text) => (
                <a href={text} target="_blank" rel="noopener noreferrer">
                    {text}
                </a>
            ),
        },
        {
            title: 'Downloads',
            dataIndex: 'downloads',
            key: 'downloads',
        }
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Title level={2}>My Shared Links</Title>
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
