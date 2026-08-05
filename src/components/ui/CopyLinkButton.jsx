import { useState } from 'react'
import { HiOutlineCheck, HiOutlineLink } from 'react-icons/hi2'
import Button from './Button'
import { copyText } from '../../utils/clipboard'

export default function CopyLinkButton({ link, size = 'sm', variant = 'secondary', className = '' }) {
  const [copied, setCopied] = useState(false)

  async function handleCopy() {
    const ok = await copyText(link)
    if (ok) {
      setCopied(true)
      setTimeout(() => setCopied(false), 1800)
    }
  }

  return (
    <Button type="button" variant={variant} size={size} onClick={handleCopy} className={className}>
      {copied ? <HiOutlineCheck size={14} /> : <HiOutlineLink size={14} />}
      {copied ? 'Copied!' : 'Copy form link'}
    </Button>
  )
}
