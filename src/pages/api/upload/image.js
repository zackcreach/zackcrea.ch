export default function handler(req, res) {
    const url = await uploadImage(req.file);
    res.status(200).json({data: { url}});
  }