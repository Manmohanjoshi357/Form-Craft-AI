import { Link } from 'react-router-dom'
import { HiOutlineArrowTopRightOnSquare, HiOutlineChatBubbleLeftRight, HiOutlineTrash } from 'react-icons/hi2'
import IndexCard from '../ui/IndexCard'
import FieldTag from '../ui/FieldTag'
import Button from '../ui/Button'

export default function FormCard({ form, responseCount, onDelete }) {
  return (
    <IndexCard className="flex flex-col p-6">
      <div className="flex items-start justify-between gap-3">
        <FieldTag tone={form.published ? 'signal' : 'default'}>
          {form.published ? 'Published' : 'Draft'}
        </FieldTag>
        <span className="font-tag text-[10px] uppercase text-ink-faint">
          {new Date(form.createdAt).toLocaleDateString()}
        </span>
      </div>

      <h3 className="mt-4 font-display text-lg font-semibold text-ink">{form.title}</h3>
      <p className="mt-1 text-sm text-ink-soft">
        {form.schema?.fields?.length ?? 0} fields · {responseCount} {responseCount === 1 ? 'response' : 'responses'}
      </p>

      <div className="mt-6 flex flex-wrap items-center gap-2 border-t border-dashed border-line pt-5">
        <Button as={Link} to={`/form/${form.id}`} variant="secondary" size="sm">
          <HiOutlineArrowTopRightOnSquare size={14} /> Open form
        </Button>
        <Button as={Link} to={`/form/${form.id}/responses`} variant="ghost" size="sm">
          <HiOutlineChatBubbleLeftRight size={14} /> View responses
        </Button>
        <Button
          type="button"
          variant="ghost"
          size="sm"
          onClick={onDelete}
          className="ml-auto text-stamp hover:text-stamp"
          aria-label={`Delete ${form.title}`}
        >
          <HiOutlineTrash size={14} />
        </Button>
      </div>
    </IndexCard>
  )
}
