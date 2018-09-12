module.exports = {
    local: {
        key: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET,
        region: process.env.AWS_REGION,
        bucket: process.env.AWS_BUCKET,
        end_point: process.env.AWS_END_POINT,
    },
    dev: {
        key: process.env.AWS_KEY,
        secret: process.env.AWS_SECRET,
        region: process.env.AWS_REGION,
        bucket: process.env.AWS_BUCKET,
        end_point: process.env.AWS_END_POINT,
    },
};
